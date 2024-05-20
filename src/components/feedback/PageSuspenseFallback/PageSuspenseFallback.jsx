import { Suspense } from "react";

const PageSuspenseFallback = ({ children }) => {
  return <Suspense fallback={<div>loading the page</div>}>{children}</Suspense>;
};

export default PageSuspenseFallback;
