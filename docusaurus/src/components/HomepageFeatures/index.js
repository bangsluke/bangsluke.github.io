import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const InternalLinks = [
  {
    title: 'General Documentation',
    Svg: require('@site/static/img/general-documentation.svg').default,
    description: (
      <>
        General documentation I have accumulated over time
      </>
    ),
    link: '/docs/general-documentation',
  },
  {
    title: 'Product Management',
    Svg: require('@site/static/img/product-management.svg').default,
    description: (
      <>
        Product Management documentation I utilise
      </>
    ),
    link: '/docs/product-management',
  },
  {
    title: 'SDLC',
    Svg: require('@site/static/img/sdlc.svg').default,
    description: (
      <>
        A detailed guide to the Software Development Life Cycle (SDLC) and how Generative AI is revolutionizing each phase
      </>
    ),
    link: '/docs/SDLC',
  },
  {
    title: 'Project Set Up to Release',
    Svg: require('@site/static/img/project-set-up-to-release.svg').default,
    description: (
      <>
        Project Set Up to Release documentation I follow
      </>
    ),
    link: '/docs/project-set-up-to-release',
  },
  {
    title: 'Projects',
    Svg: require('@site/static/img/projects.svg').default,
    description: (
      <>
        The documentation for some of my projects.
      </>
    ),
    link: '/docs/projects',
  },
];

const ExternalLinks = [
  {
    title: 'React',
    Svg: require('@site/static/img/react-logo.svg').default,
    description: (
      <>
           A JavaScript library for building user interfaces
      </>
    ),
    link: 'https://reactjs.org/',
  },
  {
    title: 'Next.js',
    Svg: require('@site/static/img/next-js-logo.svg').default,
    description: (
      <>
        The React Framework for Production
      </>
    ),
    link: 'https://nextjs.org/',
  },
   {
    title: 'Python',
    Svg: require('@site/static/img/python-logo.svg').default,
    description: (
      <>
        A programming language that lets you work quickly and integrate systems more effectively.
      </>
    ),
    link: 'https://www.python.org/',
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Wrap Svg in a link if provided, otherwise just render it */}
          <a href={link} target={link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
            <Svg className={styles.featureSvg} role="img" />
          </a>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>
             <a href={link} target={link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
              {title}
            </a>
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features} style={{display:'block'}}> 
        <div className="container">
            <h2 className="text--center">Internal Links</h2>
            <div className="row" style={{justifyContent: 'center'}}>
            {InternalLinks.map((props, idx) => (
                <Feature key={idx} {...props} />
            ))}
            </div>
        </div>

        <div className="container" style={{marginTop: '2rem'}}>
            <h2 className="text--center">External Links</h2>
            <div className="row" style={{justifyContent: 'center'}}>
            {ExternalLinks.map((props, idx) => (
                <Feature key={idx} {...props} />
            ))}
            </div>
        </div>
    </section>
  );
}
