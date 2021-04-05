import React from "react";

export const Error = (prop: any) => {
  const { message } = prop;
  return <h4 className="error">There was an error {`${message}`}</h4>;
};
