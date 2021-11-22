import React from 'react';
import './PageHeader.css';

/**
 * Page Header
 * This component takes in title and description props 
 * Can be reused on any component
 */
function PageHeader({title, description}) {
  return (
    <section className="position-relative py-6 page-header">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      <div className="container">
        <div className="row page-header-row">
          <div className="col-lg-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="mb-3">{title}</h2>
              <p className="text-muted">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
