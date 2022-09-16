import { useParams } from "@remix-run/react";

// Allows you to have dynamic paths, unlike

// 'child' and 'other'
export default function DynamicChild() {
  // If you use useParams(), the variable must match the file name (!!)
  const { someId } = useParams();
  
  return <div>I am dynamic {someId}</div>;
}