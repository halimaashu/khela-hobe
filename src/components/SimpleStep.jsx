"use client"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import { merienda } from './Banner';
const SimpleStep = () => {
    return (
        <div>
          <h1 className={`text-4xl font-bold text-center mb-8 ${merienda.className}`}>Simple Steps to Book</h1>
            <VerticalTimeline>
        <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ backgroundColor: '#810B38', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date=""
    iconStyle={{ background: '#541A1A', color: '#fff' }}
    icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title font-bold">Click Book Now</h3>
    <h4 className="vertical-timeline-element-subtitle">Booking steps</h4>
    <p>
     selsecg your own  favorite sport and comafrm it 
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date=""
    iconStyle={{ background: '#541A1A', color: '#fff' }}
    icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title font-bold"> Log In</h3>
    <h4 className="vertical-timeline-element-subtitle">Log in steps</h4>
    <p>
     after bookinn g you must logg in or sing in user 
    </p>
  </VerticalTimelineElement>
 
  
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date=""
    iconStyle={{ background: '#541A1A', color: '#fff' }}
    icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title font-bold">On detai page Book Naw on button</h3>
    <h4 className="vertical-timeline-element-subtitle">Final booking steps</h4>
    <p>
      Finaly Booked your Drem sport
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    icon={<StarIcon />}
  />
</VerticalTimeline>
        </div>
    );
};

export default SimpleStep;