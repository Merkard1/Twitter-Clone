import React from 'react';
import './ServiceUsage.scss';

interface IServiceUsageProps {
  isFullContent: boolean;
}

const ServiceUsage: React.FC<IServiceUsageProps> = ({ isFullContent }: IServiceUsageProps) => (
  <nav className="service-usage__list">
    {isFullContent ? (
      <>
        <span className="service-usage__item">About</span>
        <span className="service-usage__item">Help center</span>
        <span className="service-usage__item">Blog</span>
        <span className="service-usage__item">Status</span>
        <span className="service-usage__item">Terms</span>
        <span className="service-usage__item">Privacy Policy</span>
        <span className="service-usage__item">Cookies</span>
        <span className="service-usage__item">Ads info</span>
        <span className="service-usage__item">Brand</span>
        <span className="service-usage__item">Advertise</span>
        <span className="service-usage__item">Marketing</span>
        <span className="service-usage__item">Businesses</span>
        <span className="service-usage__item">Developers</span>
        <span className="service-usage__item">Directory</span>
        <span className="service-usage__item">Settings</span>
        <span className="service-usage__item">Copyright (c) 2021 Twitter, Inc.</span>
      </>
    ) : (
      <>
        <span className="service-usage__item">Terms of Service</span>
        <span className="service-usage__item">Privacy Policy</span>
        <span className="service-usage__item">Cookie Policy</span>
        <span className="service-usage__item">Ads info</span>
        <span className="service-usage__item">More ···</span>
        <span className="service-usage__item">© 2021 Twitter, Inc.</span>
      </>
    )}
  </nav >
);

export default ServiceUsage;


