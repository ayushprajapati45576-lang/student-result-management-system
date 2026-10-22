import { createElement, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  RefreshCw,
  Users,
  XCircle,
} from "lucide-react";
import { useGetResultsQuery } from "../../features/result/resultApi";
import { useGetStudentsQuery } from "../../features/student/studentApi";
import { useGetSubjectsQuery } from "../../features/subject/subjectApi";

const queryOptions = {
  pollingInterval: 30000,
  refetchOnFocus: true,
  refetchOnReconnect: true,
};

const Dashboard = () => {
  const studentsQuery = useGetStudentsQuery(undefined, queryOptions);
  const subjectsQuery = useGetSubjectsQuery(undefined, queryOptions);
  const resultsQuery = useGetResultsQuery(undefined, queryOptions);

  const hasError =
    studentsQuery.isError || subjectsQuery.isError || resultsQuery.isError;
  const isLoading =
    studentsQuery.isLoading || subjectsQuery.isLoading || resultsQuery.isLoading;
  const isFetching =
    studentsQuery.isFetching || subjectsQuery.isFetching || resultsQuery.isFetching;

  const resultGroups = useMemo(() => {
    const groups = new Map();

    (resultsQuery.data || []).forEach((result) => {
      const studentId = result.student?._id;
      const key = `${studentId || "unknown"}_${result.year}`;
      const group = groups.get(key) || {
        key,
        student: result.student,
        year: result.year,
        results: [],
        latestUpdate: 0,
      };

      group.results.push(result);
      group.latestUpdate = Math.max(
        group.latestUpdate,
        new Date(result.updatedAt || result.createdAt || 0).getTime() || 0
      );
      groups.set(key, group);
    });

    return Array.from(groups.values()).map((group) => {
      const marks = group.results.reduce(
        (total, result) => total + Number(result.marksObtained || 0),
        0
      );
      const totalMarks = group.results.reduce(
        (total, result) => total + Number(result.totalMarks || 0),
        0
      );
      const percentage = totalMarks > 0 ? (marks / totalMarks) * 100 : 0;

      return {
        ...group,
        percentage,
        passed: totalMarks > 0 && percentage >= 40,
      };
    });
  }, [resultsQuery.data]);

  const latestResultsByStudent = useMemo(() => {
    const latestByStudent = new Map();

    [...resultGroups]
      .sort((a, b) => Number(b.year || 0) - Number(a.year || 0) || b.latestUpdate - a.latestUpdate)
      .forEach((group) => {
        const studentId = group.student?._id || group.key;
        if (!latestByStudent.has(studentId)) {
          latestByStudent.set(studentId, group);
        }
      });

    return Array.from(latestByStudent.values());
  }, [resultGroups]);

  const recentResults = useMemo(
    () => [...resultGroups].sort((a, b) => b.latestUpdate - a.latestUpdate).slice(0, 5),
    [resultGroups]
  );

  const passedCount = latestResultsByStudent.filter((group) => group.passed).length;
  const failedCount = latestResultsByStudent.filter((group) => !group.passed).length;
  const passRate = latestResultsByStudent.length
    ? Math.round((passedCount / latestResultsByStudent.length) * 100)
    : 0;

  const metrics = [
    {
      label: "Registered students",
      value: studentsQuery.data?.length,
      note: "Student accounts",
      icon: Users,
      color: "text-blue-600 bg-blue-50",
      href: "/admin/students/manage",
    },
    {
      label: "Passed students",
      value: passedCount,
      note: "Latest declared result · 40% pass mark",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
      href: "/admin/results/manage",
    },
    {
      label: "Failed students",
      value: failedCount,
      note: "Latest declared result · 40% pass mark",
      icon: XCircle,
      color: "text-rose-600 bg-rose-50",
      href: "/admin/results/manage",
    },
    {
      label: "Subjects",
      value: subjectsQuery.data?.length,
      note: "Subjects listed",
      icon: BookOpen,
      color: "text-violet-600 bg-violet-50",
      href: "/admin/subjects/manage",
    },
  ];

  const errorMessage = [
    studentsQuery.error?.data?.message || studentsQuery.error?.error,
    subjectsQuery.error?.data?.message || subjectsQuery.error?.error,
    resultsQuery.error?.data?.message || resultsQuery.error?.error,
  ]
    .filter(Boolean)
    .join(" · ");

  const refreshDashboard = () => {
    studentsQuery.refetch();
    subjectsQuery.refetch();
    resultsQuery.refetch();
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-200">Admin overview</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-200">
            A live snapshot of student registrations and academic results.
          </p>
        </div>
        <button
          type="button"
          onClick={refreshDashboard}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-wait disabled:opacity-60 sm:self-center"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Updating…" : "Refresh"}
        </button>
      </section>

      {hasError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          <p className="font-semibold">Dashboard data could not be fully loaded.</p>
          <p className="mt-1">
            {errorMessage || "Please check your connection and try refreshing."}
          </p>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, note, icon: Icon, color, href }) => (
          <Link
            key={label}
            to={href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className={`rounded-xl p-3 ${color}`}>
                {createElement(Icon, { className: "h-5 w-5" })}
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-indigo-600" />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {isLoading || hasError ? "—" : value ?? 0}
            </p>
            <p className="mt-2 text-xs text-slate-500">{note}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Result summary</h2>
              <p className="text-sm text-slate-500">Students with published results</p>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {isLoading || hasError ? "—" : latestResultsByStudent.length}
              </p>
              <p className="mt-1 text-sm text-slate-500">Students evaluated</p>
            </div>
            <p className="text-sm font-semibold text-indigo-700">
              {isLoading || hasError ? "—" : `${passRate}% pass rate`}
            </p>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-rose-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{
                width: `${isLoading || hasError ? 0 : passRate}%`,
              }}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Based on each student’s latest published year. Overall marks of 40% or more count as a pass.
          </p>
          <Link
            to="/admin/results/manage"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          >
            View all results <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900">Recent result activity</h2>
              <p className="text-sm text-slate-500">Latest published student result sets</p>
            </div>
            <GraduationCap className="h-5 w-5 text-indigo-600" />
          </div>

          {isLoading ? (
            <p className="py-8 text-center text-sm text-slate-500">Loading recent results…</p>
          ) : hasError ? (
            <p className="py-8 text-center text-sm text-slate-500">
              Recent results are unavailable until the data connection is restored.
            </p>
          ) : recentResults.length === 0 ? (
            <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
              <p className="font-medium text-slate-700">No results published yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Newly published results will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentResults.map((group) => (
                <li key={group.key} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {group.student?.user?.name || "Student"}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Roll {group.student?.rollNo || "—"} · {group.year} ·{" "}
                      {group.results.length} subject{group.results.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-bold text-slate-900">
                      {group.percentage.toFixed(1)}%
                    </p>
                    <span
                      className={`text-xs font-semibold ${
                        group.passed ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {group.passed ? "PASS" : "FAIL"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
