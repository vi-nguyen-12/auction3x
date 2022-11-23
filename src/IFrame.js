import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const IFrame = ({ children, src, setTitle }) => {
  const [contentRef, setContentRef] = useState(null);
  const container = contentRef?.contentWindow?.document?.body;
  useEffect(() => {
    window.open(src, "theFrame");
  }, [contentRef?.contentWindow?.document?.title]);
  return (
    <iframe
      name="theFrame"
      id="the_frame"
      ref={setContentRef}
      // src={src}
      width="100%"
      height="100%"
    >
      {container && createPortal(children, container)}
    </iframe>
  );
};

export default IFrame;
