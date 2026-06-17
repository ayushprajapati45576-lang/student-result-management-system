const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Class = require("./models/class");
const Result = require("./models/result");

async function checkDuplicates() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.LIVE_URL);
    console.log("Database connected successfully! Checking duplicate classes...");

    // 1. Check duplicate classes (where course is the same)
    const duplicateClasses = await Class.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 },
          ids: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    if (duplicateClasses.length > 0) {
      console.log("\n⚠️ WARNING: Duplicate Classes Found!");
      duplicateClasses.forEach(item => {
        console.log(`Course "${item._id}" exists ${item.count} times in database. Document IDs:`, item.ids);
      });
      console.log("Action Required: Please delete the duplicate class documents from your MongoDB Atlas database (or clean them) before applying unique index.");
    } else {
      console.log("\n✅ Perfect: No duplicate classes found.");
    }

    // 2. Check duplicate results (student + subject + year)
    const duplicateResults = await Result.aggregate([
      {
        $group: {
          _id: { student: "$student", subject: "$subject", year: "$year" },
          count: { $sum: 1 },
          ids: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    if (duplicateResults.length > 0) {
      console.log("\n⚠️ WARNING: Duplicate Results Found!");
      duplicateResults.forEach(item => {
        console.log(`Duplicate result for Student: ${item._id.student}, Subject: ${item._id.subject}, Year: ${item._id.year} (${item.count} copies). Document IDs:`, item.ids);
      });
      console.log("Action Required: Please delete the duplicate result documents from your database.");
    } else {
      console.log("\n✅ Perfect: No duplicate results found.");
    }

  } catch (error) {
    console.error("Database connection/checking error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from database.");
  }
}

checkDuplicates();
