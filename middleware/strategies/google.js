const { Strategy } = require("passport-google-oauth2");
const { User } = require("../../models/user");

const googleParams = {
  clientID: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  callbackURL: `${process.env.APP_URL}${process.env.GOOGLE_CALLBACK_URL}`,

  passReqToCallback: true,
  proxy: true,
  passport: true,
};
const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const newUser = await User.create({ email });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

/* const googleStrategy = new Strategy({}, () => {});
{} - object setting
()=>{} - callback
*/

module.exports = googleStrategy;
