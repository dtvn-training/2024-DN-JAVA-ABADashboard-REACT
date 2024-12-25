// src/components/DashboardFilters.tsx

import React, { useState } from 'react';
import FilterDropdown from './filter-dropdown/FilterDropdown';

const DashboardFilters: React.FC = () => {
  const [medium, setMedium] = useState('Medium');
  const [event, setEvent] = useState('Event');
  const [time, setTime] = useState('Weekly');
  const [campaign, setCampaign] = useState('Campaign');

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
      <FilterDropdown
        label="Medium"
        options={['Medium', 'High', 'Low']}
        value={medium}
        onChange={(e) => setMedium(e.target.value)}
      />
      <FilterDropdown
        label="Event"
        options={['Event', 'Meeting', 'Call']}
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      />
      <FilterDropdown
        label="Time"
        options={['Daily', 'Weekly', 'Monthly']}
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <FilterDropdown
        label="Campaign"
        options={['Campaign A', 'Campaign B', 'Campaign C']}
        value={campaign}
        onChange={(e) => setCampaign(e.target.value)}
      />
    </div>
  );
};

export default DashboardFilters;