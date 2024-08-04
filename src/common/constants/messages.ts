export const UserMessages = {
    isExist: 'User already exist.',
    notFound: 'User not found.',
    unexpectedError: 'Error creating user.',
    ok: 'User has been created successfully. You have sent an temporary password to login.',
    invalidPassword : 'Invalid password.',
    passwordUpdated : 'Password has been updated successfully.',
    userDeleted : 'User has been deleted successfully.'
};

export const OtpMessages = {
    unexpectedError: 'Error sending verification key.',
    ok: 'Otp has been verified successfully.',
    okAndUpdatePassword :  'Otp has been verified please update your password.',
    invalidOtp : 'Invalid otp.',
    otpExpired : 'Otp has been expired.',
    otpSent : 'Otp has been sent to your registered email',
};

export const EmailSubjects = {
    oneTimePassword: 'Your One Time Password',
    verificationKey: 'Verification Key',
};

export const OneTimePasswordEmailBody = (password: string) => `Your one time password : ${password}`;
export const OTP_EXPIRY = 5;
export const VerificationEmailBody = (key: string) => `Verification key : ${key} which will expires in ${OTP_EXPIRY} minute${OTP_EXPIRY > 1 && 's'}.`;

// Cases
export const CaseMessages = {
    isExist: 'Case already exists.',
    notFound: 'Case not found.'
};

