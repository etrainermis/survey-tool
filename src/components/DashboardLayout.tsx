import React, { useState, useEffect } from "react";
import TradesSection from "./sections/TradesSection";
import InfrastructureSection from "./sections/InfrastructureSection";
import ITSection from "./sections/ITSection";
import { useAllSurveys } from "@/hooks/useAllSurveys";
import { Provinces, Districts, Sectors } from "rwanda";

const DashboardLayout = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [filteredSurveys, setFilteredSurveys] = useState<any[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableSchools, setAvailableSchools] = useState<any[]>([]);
  
  const { surveys, fetchingSurveys } = useAllSurveys();

  // Process surveys to get unique locations with data
  useEffect(() => {
    if (surveys) {
      console.log(surveys);
      const processed = surveys.map((survey: any) => {
        const data = JSON.parse(survey.schoolSurveyData);
        return {
          ...survey,
          processedData: data,
          isComplete: data.school && data.school.districtId && data.school.id && data.school.name
        };
      });
      setFilteredSurveys(processed.filter((survey: any) => survey.isComplete));
    }
  }, [surveys]);

  // Get unique provinces that have data
  const availableProvinces = React.useMemo(() => {
    if (!filteredSurveys?.length) return [];
    const uniqueProvinces = new Set();
    const allProvinces = Provinces();
    
    filteredSurveys.forEach(survey => {
      // Find which province contains this district
      allProvinces.forEach(province => {
        const districtsInProvince = Districts(province);
        if (districtsInProvince.includes(survey.processedData.school.districtId.name)) {
          uniqueProvinces.add(province);
        }
      });
    });
    
    return Array.from(uniqueProvinces) as string[];
  }, [filteredSurveys]);

  // Update available districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const districtsInProvince = Districts(selectedProvince);
      const districtsWithData = filteredSurveys
        .filter(survey => survey.processedData.school.districtId)
        .filter(survey => 
          districtsInProvince.includes(survey.processedData.school.districtId.name)
        )
        .map(survey => survey.processedData.school.districtId.name);
      
      setAvailableDistricts([...new Set(districtsWithData)]);
    } else {
      setAvailableDistricts([]);
    }
    setSelectedDistrict("");
    setSelectedSchool("");
  }, [selectedProvince, filteredSurveys]);

  // Update available schools when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const schoolsInDistrict = filteredSurveys
        .filter(survey => 
          survey.processedData.school.districtId.name === selectedDistrict
        )
        .map(survey => ({
          id: survey.processedData.school.id,
          name: survey.processedData.school.name
        }));
      
      setAvailableSchools(schoolsInDistrict);
    } else {
      setAvailableSchools([]);
    }
    setSelectedSchool("");
  }, [selectedDistrict, filteredSurveys]);

  // Filter surveys based on selection
  const getFilteredData = React.useMemo(() => {
    if (selectedSchool) {
      return filteredSurveys.filter(s => s.processedData.school.id === selectedSchool);
    }
    if (selectedDistrict) {
      return filteredSurveys.filter(s => s.processedData.school.districtId.name === selectedDistrict);
    }
    if (selectedProvince) {
      const districtsInProvince = Districts(selectedProvince);
      return filteredSurveys.filter(s => 
        districtsInProvince.includes(s.processedData.school.districtId.name)
      );
    }
    return filteredSurveys;
  }, [selectedProvince, selectedDistrict, selectedSchool, filteredSurveys]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Location Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Province Filter */}
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                Province
              </label>
              <select
                id="province"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Province</option>
                {availableProvinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            {selectedProvince && (
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* School Filter */}
            {selectedDistrict && (
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                  School
                </label>
                <select
                  id="school"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select School</option>
                  {availableSchools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-6">
          <h2 className="Bold text-[30px]">Infrastructure section</h2>
          <InfrastructureSection data={getFilteredData} />
          <h2 className="Bold text-[30px]">IT section</h2>
          <ITSection data={getFilteredData} />
          <h2 className="SemiBold text-[30px]">Trade section</h2>
          <TradesSection data={getFilteredData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


