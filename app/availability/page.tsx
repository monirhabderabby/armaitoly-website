import { Suspense } from "react";
import AvailabilityContainer from "./_components/availability-container";

const Page = () => {
  return (
    <div className="mt-24 container mx-auto">
      <Suspense>
        <AvailabilityContainer />
      </Suspense>
    </div>
  );
};

export default Page;
