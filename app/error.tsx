"use client";

//* Packages Imports */
import { useEffect } from "react";

//* Components Imports */
import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title='Uh Oh' subtitle='Something went wrong!' />;
};

export default ErrorState;
