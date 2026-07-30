import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/react";
import React, { useEffect } from "react";
import ApplicationCard from "./application-card";
import { BarLoader } from "react-spinners";

function CreatedApplications() {
  const { user } = useUser();
  const {
    loading: loadingApplications,
    data: applications,
    fn: fnapplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    if (user?.id) {
      fnapplications();
    }
  }, [user?.id]);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        );
      })}
    </div>
  );
}

export default CreatedApplications;
