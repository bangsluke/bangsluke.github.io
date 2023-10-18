import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "React",
    Svg: require("@site/static/img/react-logo.svg").default,
    description: (
      <>
        The React.js documentation includes comprehensive information, examples,
        and guidelines for building efficient and interactive user interfaces
        using the React library
      </>
    ),
    urlLink: "https://react.dev/",
  },
  {
    title: "Next.js",
    Svg: require("@site/static/img/next-js-logo.svg").default,
    description: (
      <>
        The Next.js documentation comprises comprehensive guidance, examples,
        and best practices for building server-rendered React applications with
        efficient routing, data fetching, and server-side rendering capabilities
      </>
    ),
    urlLink: "https://nextjs.org/docs",
  },
  {
    title: "Python",
    Svg: require("@site/static/img/python-logo.svg").default,
    description: (
      <>
        The Python documentation covers a wide array of comprehensive
        information, tutorials, and examples for learning and utilizing the
        Python programming language, encompassing syntax, standard libraries,
        and application development principles
      </>
    ),
    urlLink: "https://www.python.org/",
  },
];

function Feature({ Svg, title, description, urlLink }) {
  return (
    <div className={clsx("col col--4")}>
      <a href={urlLink} target="_blank" rel="noreferrer">
        <div className={styles.featureSvgContainer}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
