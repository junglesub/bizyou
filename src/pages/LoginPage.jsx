import React, { useState, useRef } from "react";
import InputMask from "react-input-mask";
import { motion, AnimatePresence } from "framer-motion";
import OtpInput from "otp-input-react";
import Countdown from "react-countdown";
import toast, { Toaster } from "react-hot-toast";

const PHONE_STEP = 0;
const OTP_STEP = 1;
const SUCCESS_STEP = 2;

const PHONE_REGEX = /^01[016789]-\d{3,4}-\d{4}$/;

function formatPhone(phone) {
  // 01012345678 -> 010-1234-5678
  if (!phone) return "";
  const onlyNum = phone.replace(/\D/g, "");
  if (onlyNum.length < 4) return onlyNum;
  if (onlyNum.length < 8) return `${onlyNum.slice(0, 3)}-${onlyNum.slice(3)}`;
  return `${onlyNum.slice(0, 3)}-${onlyNum.slice(3, 7)}-${onlyNum.slice(
    7,
    11
  )}`;
}

function LoginPage({
  initialStep = PHONE_STEP,
  initialPhone = "",
  initialMaskedPhone = "",
  initialOtp = "",
  initialOtpSent = false,
  initialTimerKey = 0,
  initialOtpError = "",
  initialIsVerifying = false,
  initialSessionToken = null,
}) {
  const [step, setStep] = useState(initialStep);
  const [phone, setPhone] = useState(initialPhone);
  const [maskedPhone, setMaskedPhone] = useState(initialMaskedPhone);
  const [otp, setOtp] = useState(initialOtp);
  const [otpSent, setOtpSent] = useState(initialOtpSent);
  const [timerKey, setTimerKey] = useState(initialTimerKey);
  const [otpError, setOtpError] = useState(initialOtpError);
  const [isVerifying, setIsVerifying] = useState(initialIsVerifying);
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  const otpInputRef = useRef();

  // Simulate backend: send OTP
  const handleSendOtp = () => {
    if (!PHONE_REGEX.test(maskedPhone)) {
      toast.error("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }
    setOtpSent(true);
    setStep(OTP_STEP);
    setOtp("");
    setOtpError("");
    setTimerKey((prev) => prev + 1);
    toast.success("인증번호를 전송했어요!");
    // Focus OTP input after animation
    setTimeout(() => {
      otpInputRef.current?.focusInput(0);
    }, 500);
  };

  // Simulate backend: verify OTP
  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (otp === "1234") {
        // Demo: 123456 is always correct
        setSessionToken("demo-session-token-uuid");
        setStep(SUCCESS_STEP);
        toast.success("인증이 완료되었습니다!");
      } else {
        setOtpError("❌ 인증번호가 틀렸어요");
        toast.error("인증번호가 틀렸어요");
      }
    }, 800);
  };

  // Timer expired
  const handleTimerComplete = () => {
    setOtpError("시간이 만료되었어요. 다시 시도해주세요.");
    toast.error("시간이 만료되었어요. 다시 시도해주세요.");
  };

  // Resend OTP
  const handleResendOtp = () => {
    setOtp("");
    setOtpError("");
    setTimerKey((prev) => prev + 1);
    toast.success("인증번호를 다시 전송했어요!");
    setTimeout(() => {
      otpInputRef.current?.focusInput(0);
    }, 500);
  };

  // Phone input change
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPhone(raw);
    setMaskedPhone(formatPhone(raw));
  };

  // OTP input change
  const handleOtpChange = (val) => {
    setOtp(val);
    setOtpError("");
  };

  // Success CTA
  const handleStartSurvey = () => {
    // TODO: router push to survey, pass sessionToken if needed
    window.location.href = "/survey";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative">
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        {step === PHONE_STEP && (
          <motion.div
            key="phone-step"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xs mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center"
          >
            <div className="text-lg font-bold mb-2">
              📱 전화번호로 간편 시작하기
            </div>
            <div className="w-full mb-4">
              <InputMask
                mask="010-9999-9999"
                maskChar={null}
                value={maskedPhone}
                onChange={handlePhoneChange}
                placeholder="010-1234-5678"
                className="w-full text-center text-xl py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-mono tracking-widest bg-gray-50"
                inputMode="numeric"
                autoFocus
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className={`w-full py-3 rounded-lg text-white font-bold text-base transition-all shadow-md ${
                PHONE_REGEX.test(maskedPhone)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!PHONE_REGEX.test(maskedPhone)}
              onClick={handleSendOtp}
            >
              📩 인증번호 받기
            </motion.button>
            <div className="text-xs text-gray-400 mt-4 text-center">
              문자는 1분 내에 도착해요.
              <br />
              스팸함도 확인해주세요!
            </div>
          </motion.div>
        )}

        {step === OTP_STEP && (
          <motion.div
            key="otp-step"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xs mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center"
          >
            <div className="text-lg font-bold mb-2">
              📩 인증번호를 입력해주세요
            </div>
            <div className="text-sm text-gray-500 mb-2 text-center">
              {maskedPhone}로 전송했어요.
            </div>
            <div className="mb-4">
              <OtpInput
                ref={otpInputRef}
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                isInputNum
                shouldAutoFocus
                inputStyle={{
                  width: "2.5rem",
                  height: "2.5rem",
                  margin: "0 0.3rem",
                  fontSize: "1.5rem",
                  borderRadius: "0.75rem",
                  border: "1.5px solid #d1d5db",
                  background: "#f9fafb",
                  textAlign: "center",
                  outline: "2px solid #2563eb",
                  outlineOffset: "2px",
                  transition: "border 0.2s, outline 0.2s",
                }}
                focusStyle={{
                  border: "2px solid #2563eb",
                  background: "#fff",
                  outline: "2.5px solid #60a5fa",
                  outlineOffset: "2px",
                }}
                containerStyle={{ justifyContent: "center" }}
                inputType="tel"
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Countdown
                key={timerKey}
                date={Date.now() + 3 * 60 * 1000}
                renderer={({ minutes, seconds, completed }) =>
                  completed ? (
                    <span className="text-red-500 font-bold">만료됨</span>
                  ) : (
                    <span className="text-gray-500 text-sm font-mono">
                      🕒 {String(minutes).padStart(2, "0")}:
                      {String(seconds).padStart(2, "0")}
                    </span>
                  )
                }
                onComplete={handleTimerComplete}
              />
              <button
                className="text-xs text-blue-500 underline ml-2"
                onClick={handleResendOtp}
                type="button"
              >
                🔁 다시 받기
              </button>
            </div>
            {otpError && (
              <div className="text-xs text-red-500 mb-2 text-center animate-pulse">
                {otpError}
              </div>
            )}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: otp.length === 6 ? 1.03 : 1 }}
              className={`w-full py-3 rounded-lg text-white font-bold text-base transition-all shadow-md ${
                otp.length === 4 && !otpError
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={otp.length !== 4 || !!otpError || isVerifying}
              onClick={handleVerifyOtp}
            >
              {isVerifying ? "확인 중..." : "✅ 인증 완료하기"}
            </motion.button>
            <div className="text-xs text-gray-400 mt-4 text-center">
              인증번호는 전송 후 3분 이내에 입력해주세요.
            </div>
          </motion.div>
        )}

        {step === SUCCESS_STEP && (
          <motion.div
            key="success-step"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xs mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center"
          >
            <div className="text-2xl mb-2">✅ 인증이 완료되었습니다!</div>
            <div className="text-base text-gray-600 mb-6 text-center">
              이제, 나에게 맞는 부스를 찾아볼까요?
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="w-full py-3 rounded-lg text-white font-bold text-base transition-all shadow-md bg-green-500 hover:bg-green-600"
              onClick={handleStartSurvey}
            >
              🚀 설문 시작하기
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoginPage;
