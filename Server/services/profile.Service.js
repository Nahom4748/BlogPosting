const db = require("../config/db.config");
const path = require("path");

const updateProfile = async (data, userId, profilePicture) => {
  const { bio } = data;

  // If a profile picture is provided, store it
  let profilePicturePath = profilePicture ? profilePicture.filename : null;

  try {
    // Update the user's profile data in the database
    const result = await db.execute(
      `UPDATE Users SET bio = ?, profile_picture = ? WHERE user_id = ?`,
      [bio, profilePicturePath, userId]
    );

    if (result.affectedRows === 0) {
      throw new Error("User not found or profile not updated");
    }

    return { bio, profile_picture: profilePicturePath };
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
};

const getProfile = async (userId) => {
  try {
    const [user] = await db.execute(
      "SELECT username, bio, profile_picture FROM Users WHERE user_id = ?",
      [userId]
    );

    if (!user.length) {
      throw new Error("User not found");
    }

    return user[0];
  } catch (error) {
    throw new Error("Error fetching profile: " + error.message);
  }
};

module.exports = { updateProfile, getProfile };
