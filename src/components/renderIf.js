import React, { Fragment } from "react";

export default ({ condition, children }) => condition ? <Fragment>{children}</Fragment> : null;