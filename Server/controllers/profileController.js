const profileService = require("../services/profile.Service");

const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.id; // From authMiddleware

    // Handle profile picture if it exists
    const profilePicture = req.file ? req.file : null;

    // Update the profile via the service layer
    const updatedProfile = await profileService.updateProfile(
      { bio },
      userId,
      profilePicture
    );

    res.status(200).json({
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware

    // Fetch profile via the service layer
    const profile = await profileService.getProfile(userId);

    res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProfile, getProfile };
