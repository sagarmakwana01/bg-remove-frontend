import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import './about-us.css';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl); // Confirm the URL is loading correctly

function About() {
  // Data states
  const [aboutData, setAboutData] = useState(null);
  const [ourMissionData, setOurMissionData] = useState(null);
  const [ourVisionData, setOurVisionData] = useState(null);
  const [ourGoalData, setOurGoalData] = useState(null);

  // Loading states
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [loadingMission, setLoadingMission] = useState(true);
  const [loadingVision, setLoadingVision] = useState(true);
  const [loadingGoal, setLoadingGoal] = useState(true);

  // Error states
  const [errorAbout, setErrorAbout] = useState(false);
  const [errorMission, setErrorMission] = useState(false);
  const [errorVision, setErrorVision] = useState(false);
  const [errorGoal, setErrorGoal] = useState(false);

  // Fetch all data in parallel
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          aboutRes,
          missionRes,
          visionRes,
          goalRes
        ] = await Promise.all([
          fetch(`${apiUrl}/about-api`).then(res => res.json()),
          fetch(`${apiUrl}/our-mission-api`).then(res => res.json()),
          fetch(`${apiUrl}/our-vision-api`).then(res => res.json()),
          fetch(`${apiUrl}/our-goal-api`).then(res => res.json()),
        ]);

        if (aboutRes.success) {
          setAboutData(aboutRes.data[0]);
        } else {
          setErrorAbout(true);
        }

        if (missionRes.success) {
          setOurMissionData(missionRes.data[0]);
        } else {
          setErrorMission(true);
        }

        if (visionRes.success) {
          setOurVisionData(visionRes.data[0]);
        } else {
          setErrorVision(true);
        }

        if (goalRes.success) {
          setOurGoalData(goalRes.data[0]);
        } else {
          setErrorGoal(true);
        }

      } catch (err) {
        console.error('Failed to fetch data:', err);
        setErrorAbout(true);
        setErrorMission(true);
        setErrorVision(true);
        setErrorGoal(true);
      } finally {
        setLoadingAbout(false);
        setLoadingMission(false);
        setLoadingVision(false);
        setLoadingGoal(false);
      }
    };

    fetchAllData();
  }, []);

  // Combined loading/error checks
  const loading = loadingAbout || loadingMission || loadingVision || loadingGoal;
  const error = errorAbout || errorMission || errorVision || errorGoal;

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error || !aboutData) {
    return <div className="container">Failed to load data.</div>;
  }

  return (
    <>
      <Banner page="About us" title="About us" />

      {/* About Section */}
      <section className='about-sect-a-wapper'>
        <div className='container w-1240'>
          <div className='row'>
            <div className='col-12 col-lg-6 mb-4 mb-lg-4'>
              <div className='about-sect-a-left-text'>
                <h2>{aboutData.title}</h2>
                <h5>{aboutData.subtitle}</h5>
                <div dangerouslySetInnerHTML={{ __html: aboutData.description }}></div>
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <div className='about-sect-a-right-img'>
                <img
                  src={`${apiUrl}/static/about/${aboutData.aboutImage}`}
                  alt={aboutData.title || 'About Image'}
                  style={{ maxWidth: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className='about-sect-b-wapper'>
        <div className='container w-1240'>
          <div className='row'>
            {/* Our Mission */}
            <div className='col-12 col-md-6 mb-4 mb-md-0'>
              <div className='about-sect-b-card'>
                <div className='about-sect-b-img'>
                  <img
                    src={`${apiUrl}/static/about/${ourMissionData?.ourMissionImage}`}
                    alt={ourMissionData?.title || 'Our Mission Image'}
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <div className='about-sect-b-text'>
                  <h3>{ourMissionData?.title}</h3>
                  <h5>{ourMissionData?.subtitle}</h5>
                  <div dangerouslySetInnerHTML={{ __html: ourMissionData?.description }}></div>
                </div>
              </div>
            </div>

            {/* Our Vision */}
            <div className='col-12 col-md-6 mb-4 mb-md-0'>
              <div className='about-sect-b-card'>
                <div className='about-sect-b-img'>
                  <img
                    src={`${apiUrl}/static/about/${ourVisionData?.ourVisionImage}`}
                    alt={ourVisionData?.title || 'Our Vision Image'}
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <div className='about-sect-b-text'>
                  <h3>{ourVisionData?.title}</h3>
                  <h5>{ourVisionData?.subtitle}</h5>
                  <div dangerouslySetInnerHTML={{ __html: ourVisionData?.description }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goal Section */}
      <section className='about-sect-c-wapper'>
        <div className='container w-1240'>
          <div className='about-sect-c-card'>
            <h2>
              <Link to={ourGoalData?.link}>{ourGoalData?.linkName}</Link> {ourGoalData?.title}
            </h2>
            <h5>{ourGoalData?.subtitle}</h5>
            <div dangerouslySetInnerHTML={{ __html: ourGoalData?.description }}></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
