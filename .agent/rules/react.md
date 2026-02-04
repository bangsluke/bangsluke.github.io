---
trigger: glob
globs:
  [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/components/**/*",
    "src/pages/**/*.js",
    "src/theme/**/*.js",
  ]
---

---

## description: React 18 component patterns and hooks best practices

# React 18 Patterns

## Component Structure

### Functional Components Only

Always use functional components with hooks. No class components.

```javascript
// Good
function MyComponent({ title, children }) {
  const [state, setState] = useState(initialValue);

  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

// Bad - don't use class components
class MyComponent extends React.Component { ... }
```

### Component File Structure

```javascript
// 1. Imports
import React, { useState, useEffect } from "react";
import styles from "./MyComponent.module.css";

// 2. Component definition
function MyComponent({ prop1, prop2 }) {
  // 3. Hooks at the top
  const [state, setState] = useState(null);

  // 4. Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);

  // 5. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 6. Render
  return <div className={styles.container}>{/* JSX */}</div>;
}

// 7. Export
export default MyComponent;
```

---

## Hooks Best Practices

### useState

```javascript
// Simple state
const [count, setCount] = useState(0);

// Object state - always spread previous state
const [form, setForm] = useState({ name: "", email: "" });
setForm((prev) => ({ ...prev, name: "New Name" }));

// Lazy initialization for expensive computations
const [data, setData] = useState(() => computeExpensiveValue());
```

### useEffect

```javascript
// With cleanup
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);

// With dependencies - be explicit
useEffect(() => {
  fetchData(userId);
}, [userId]);

// Empty deps = run once on mount
useEffect(() => {
  initializeOnce();
}, []);
```

### useCallback and useMemo

```javascript
// Memoize callbacks passed to children
const handleSubmit = useCallback(
  (data) => {
    submitForm(data);
  },
  [submitForm],
);

// Memoize expensive computations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

---

## Props Patterns

### Destructure Props

```javascript
// Good - destructure in parameters
function Button({ label, onClick, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// Avoid - props object
function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Children Pattern

```javascript
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}
```

### Spread Remaining Props

```javascript
function Input({ label, ...inputProps }) {
  return (
    <label>
      {label}
      <input {...inputProps} />
    </label>
  );
}
```

---

## JSX Best Practices

### Conditional Rendering

```javascript
// Short-circuit for simple conditions
{
  isVisible && <Component />;
}

// Ternary for if-else
{
  isLoading ? <Spinner /> : <Content />;
}

// Early return for complex conditions
if (!data) return <Loading />;
if (error) return <Error message={error} />;
return <Content data={data} />;
```

### Lists and Keys

```javascript
// Always use stable, unique keys
{
  items.map((item) => <ListItem key={item.id} item={item} />);
}

// Never use index as key if list can reorder
// Bad: key={index}
```

### Event Handlers

```javascript
// Inline for simple handlers
<button onClick={() => setCount(count + 1)}>Increment</button>

// Named function for complex handlers
const handleSubmit = (e) => {
  e.preventDefault();
  // complex logic
};
<form onSubmit={handleSubmit}>
```

---

## Docusaurus-Specific React

### Theme Components

When swizzling theme components:

```javascript
import React from "react";
import OriginalComponent from "@theme-original/ComponentName";

export default function ComponentWrapper(props) {
  return (
    <>
      <OriginalComponent {...props} />
      {/* Your additions */}
    </>
  );
}
```

### Using Docusaurus Hooks

```javascript
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function MyComponent() {
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();

  return <div>{siteConfig.title}</div>;
}
```

---
