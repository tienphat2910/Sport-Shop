const User = require('../models/UserModel');
const mongoose = require('mongoose');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        // MongoDB query using Mongoose
        const users = await User.find().select('-password -otp -otpExpires');

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error('MongoDB query error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users from MongoDB',
            error: error.message
        });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        // MongoDB query using Mongoose
        const user = await User.findById(req.params.id).select('-password -otp -otpExpires');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in MongoDB'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('MongoDB query error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user from MongoDB',
            error: error.message
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        const { name, phone, address, dateOfBirth, gender } = req.body;

        // Find and update in MongoDB using Mongoose
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                phone,
                address,
                dateOfBirth,
                gender,
                // Add updatedAt timestamp
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        ).select('-password -otp -otpExpires');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in MongoDB'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully in MongoDB',
            user
        });
    } catch (error) {
        console.error('MongoDB update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user in MongoDB',
            error: error.message
        });
    }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
    try {
        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        // Delete from MongoDB using Mongoose
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in MongoDB'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully from MongoDB'
        });
    } catch (error) {
        console.error('MongoDB delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user from MongoDB',
            error: error.message
        });
    }
};
