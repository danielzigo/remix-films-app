// From the filename, this is a child of 'parent'
// but is not nested in parent, and does not inherit the
// layout route styling etc.

// 'parent.OTHER...'
export default function Other() {
  return <div>I am OTHER</div>;
}

// delete this: next => dynamic routes