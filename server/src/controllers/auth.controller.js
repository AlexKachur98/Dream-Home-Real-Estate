
import express from 'express';
import UserModel from '../models/user.model.js';
import generateToken from '../utils/jwt.js';
import mergeUserProfile from '../utils/merge_user_profile.js';


export default {

  /**
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @returns 
   */
  validate: async (req, res) => {
    req.user = await mergeUserProfile(false, req.user);
    return res.status(200).json({ user: req.user });
  },

  /**
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @returns 
   */
  loginUser: async (req, res) => {
    try {
      const
        { email, password } = req.body,
        user = await UserModel.findOne({ email });

      if (!user) return res.status(404).json('User not found');
      if (!await user.comparePassword(password)) return res.status(401).json('Invalid password');

      const token = generateToken(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000
      });

      req.user = await mergeUserProfile(true, user._doc);

      return res.status(200).json({ user: req.user });
    }
    catch (e) {
      return res.status(500).json('Internal Server Error');
    };
  },

  /**
   * @param {express.Request} _ 
   * @param {express.Response} res 
   * @returns 
   */
  logout: (_, res) => {
    res.clearCookie('token');
    return res.status(200).json("Logged out successfully");
  }

};
