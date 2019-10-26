import React from 'react';
import {
  useParams
} from "react-router-dom";

export default function DocumentRequest() {
  const { requestId } = useParams();

  return (
    <div>
      Hello World {requestId}
    </div>
  );
}