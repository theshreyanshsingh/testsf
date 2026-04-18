"use client";

import { setMobileChatOpen } from "@/app/redux/reducers/basicData";
import { RootState } from "@/app/redux/store";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Messages from "./Messages";
import Palette from "./Palette";
import Keyboard from "./Keyboard";

const MobileChat = () => {
  const { MobileChatOpen } = useSelector((state: RootState) => state.basicData);
  const dispatch = useDispatch();

  const options = ["palette", "ai"];

  return (
    <motion.div
      className="md:hidden fixed z-90 bottom-0 w-full border-t border-[#201F22] bg-[#141415] rounded-t-2xl shadow-lg"
      animate={{ y: MobileChatOpen ? 0 : "calc(100% - 40px)" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.6,
      }}
    >
      {/* Drag Handle */}

      <div
        className="flex flex-col justify-center items-center py-2 cursor-pointer hover:bg-[#2A2A2A] transition-colors"
        onClick={() => dispatch(setMobileChatOpen())}
      >
        <div className="w-8 h-1 bg-gray-500 rounded-full mb-1"></div>
        {MobileChatOpen ? (
          <span className="text-xs text-gray-400">Tap to close chat</span>
        ) : (
          <span className="text-xs text-gray-400">Tap to open chat</span>
        )}
      </div>
      {MobileChatOpen && (
        <div className="flex h-[70vh] min-h-0 w-screen flex-col overflow-x-hidden overflow-y-hidden border-l border-[#201F22] bg-[#141415]">
          {/* Palette / Messages — mirror desktop Chat wrappers so Messages manages its own scroll */}
          <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-hidden break-words scrollbar-hide">
            <div className="flex h-full min-h-0 flex-1 flex-col break-words">
              <Messages />
            </div>
          </div>

          {/* Input Keyboard */}
          <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full overflow-x-hidden border-y border-[#201F22] bg-[#1a1a1b] p-3">
              <Keyboard />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MobileChat;
