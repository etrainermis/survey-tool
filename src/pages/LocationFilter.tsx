import React from 'react';
import { useProvinces, useDistricts } from '../hooks/useLocation';
import { useSchoolsByDistrict } from '../hooks/useSchools';

interface Props {
  onSchoolSelect: (school: any) => void;
}

const LocationFilter: React.FC<Props> = ({ onSchoolSelect }) => {
  const [selectedProvince, setSelectedProvince] = React.useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState<string | null>(null);

  const { provinces, isLoading: loadingProvinces } = useProvinces();
  const { districts, isLoading: loadingDistricts } = useDistricts(selectedProvince);
  const { schools, fetchingSchools: loadingSchools } = useSchoolsByDistrict(selectedDistrict);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId || null);
    setSelectedDistrict(null);
    onSchoolSelect(null);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId || null);
    onSchoolSelect(null);
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const schoolId = e.target.value;
    const selectedSchool = schools?.find(school => school.id === schoolId);
    onSchoolSelect(selectedSchool || null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Province
        </label>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handleProvinceChange}
          value={selectedProvince || ''}
        >
          <option value="">All Provinces</option>
          {loadingProvinces ? (
            <option disabled>Loading provinces...</option>
          ) : (
            provinces?.map((province: any) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          District
        </label>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handleDistrictChange}
          value={selectedDistrict || ''}
          disabled={!selectedProvince}
        >
          <option value="">All Districts</option>
          {loadingDistricts ? (
            <option disabled>Loading districts...</option>
          ) : (
            districts?.map((district: any) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          School
        </label>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handleSchoolChange}
          disabled={!selectedDistrict}
        >
          <option value="">All Schools</option>
          {loadingSchools ? (
            <option disabled>Loading schools...</option>
          ) : (
            schools?.map((school: any) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default LocationFilter;