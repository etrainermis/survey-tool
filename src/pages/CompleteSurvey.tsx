"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog"
import { useAllSurveys } from "@/hooks/useAllSurveys"
import dayjs from "dayjs"
import { Download } from "lucide-react" // Import the Download icon

interface Survey {
  id: string
  school: {
    id: string
    name: string
    status: string
    category: string
    location?: {
      province: string
      district: string
      sector: string
      cell: string
      village: string
    }
    stats?: {
      trades: number
      students: number
      teachers: number
      maleTeachers?: number
      femaleTeachers?: number
    }
    contact?: {
      phone: string
      email: string
      headteacher: string
      owner: string
    }
    trades?: Array<{
      id: string
      name: string
      levels: Array<{
        level: number
        classrooms: number
        students: {
          male: number
          female: number
        }
      }>
      shortCourse?: {
        virtualClassrooms: number
        physicalClassrooms: number
        students: {
          male: number
          female: number
        }
      }
    }>
  }
  companies?: Array<{
    name: string
    distance: string
    trades: string[]
  }>
  infrastructure?: Array<{
    type: string
    size: string
    capacity: string
    constructionYear: number
    materials: string[]
    status: string
  }>
  it?: {
    computerLab: {
      totalComputers: number
      hasLAN: boolean
      workingComputers: number
      nonWorkingComputers: number
      hasProjectors: boolean
      totalProjectors: number
      workingProjectors: number
      nonWorkingProjectors: number
    }
    internet: {
      exists: boolean
      type?: "4G" | "Fiber"
    }
    server: {
      exists: boolean
      specifications: string
    }
    hasElearning: boolean
    energySources: string[]
    equipment: {
      hasAssetRegister: boolean
      status: string
      isAvailable: boolean
    }
  }
  strategicPlanning?: any
  operationalManagement?: any
  teachingAndLearning?: any
  stakeholdersEngagement?: any
  continuousImprovement?: any
  infrastructureAndEnvironment?: any
  completedBy?: any
  createdAt: string
  status: string
  collectedData?: any
  data?: any // Add this property to fix the first error
}

const CompletedSurveys = () => {
  const navigate = useNavigate()
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handlePreviewSurvey = (survey: Survey) => {
    if (!survey.school || !survey.school.id) {
      console.error("School ID is missing in the selected survey:", survey)
      return
    }
    setSelectedSurvey(survey)
    setPreviewOpen(true)
  }

  // Helper function to render evaluation data
  const renderEvaluationSection = (data: any, title: string) => {
    if (!data) return ""

    let html = `<div class="section"><h2>${title}</h2>`

    // Check if data is a string (JSON string)
    if (typeof data === "string") {
      try {
        data = JSON.parse(data)
      } catch (e) {
        // If parsing fails, just display as is
        return `<div class="section"><h2>${title}</h2><p>${data}</p></div>`
      }
    }

    // Handle overview if it exists
    if (data.overview) {
      html += `
        <div class="subsection">
          <h3>Overview</h3>
          ${data.overview.strength ? `<div class="info-row"><span class="info-label">Strength:</span> ${data.overview.strength}</div>` : ""}
          ${data.overview.weakness ? `<div class="info-row"><span class="info-label">Weakness:</span> ${data.overview.weakness}</div>` : ""}
          ${data.overview.improvement ? `<div class="info-row"><span class="info-label">Area of improvement:</span> ${data.overview.improvement}</div>` : ""}
        </div>
      `
    }

    // Handle totalMarks if it exists
    if (data.totalMarks !== undefined) {
      html += `<div class="info-row"><span class="info-label">Total Marks:</span> ${data.totalMarks}</div>`
    }

    // Loop through all other properties
    for (const key in data) {
      if (key === "overview" || key === "totalMarks") continue // Skip already processed

      const value = data[key]
      if (value === null || value === undefined) continue

      if (typeof value === "object") {
        // For objects like evaluation criteria
        if (value.availability !== undefined || value.quality !== undefined || value.marksAllocated !== undefined) {
          html += `
            <div class="criteria-item">
              <h4>${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</h4>
              ${value.availability !== undefined ? `<div class="info-row"><span class="info-label">Availability:</span> ${value.availability}</div>` : ""}
              ${value.quality !== undefined ? `<div class="info-row"><span class="info-label">Quality:</span> ${value.quality}</div>` : ""}
              ${value.marksAllocated !== undefined ? `<div class="info-row"><span class="info-label">Marks Allocated:</span> ${value.marksAllocated}</div>` : ""}
              ${value.observation ? `<div class="info-row"><span class="info-label">Observation:</span> ${value.observation}</div>` : ""}
            </div>
          `
        } else {
          // For nested objects, recursively process
          html += `<div class="subsection"><h3>${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</h3>`

          for (const subKey in value) {
            const subValue = value[subKey]
            if (subValue === null || subValue === undefined) continue

            if (typeof subValue === "object") {
              html += `<div class="info-row"><span class="info-label">${subKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</span> ${JSON.stringify(subValue)}</div>`
            } else {
              html += `<div class="info-row"><span class="info-label">${subKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</span> ${subValue}</div>`
            }
          }

          html += `</div>`
        }
      } else {
        // For simple values
        html += `<div class="info-row"><span class="info-label">${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</span> ${value}</div>`
      }
    }

    html += `</div>`
    return html
  }

  // Function to handle downloading survey data as PDF
  const handleDownloadSurvey = (survey: Survey) => {
    setIsDownloading(true)

    try {
      // Create a printable HTML document with the survey data
      const printWindow = window.open("", "_blank")

      if (!printWindow) {
        alert("Please allow pop-ups to download the PDF")
        setIsDownloading(false)
        return
      }

      // Filter out null values and prepare data
      const schoolName = survey.school.name || "Unknown School"
      const completedDate = dayjs(survey.createdAt).format("DD/MM/YYYY")
      const completedBy = survey.completedBy
        ? `${survey.completedBy.firstName || ""} ${survey.completedBy.lastName || ""}`.trim()
        : null

      // Parse survey data if needed
      let surveyData: any = {}
      if (survey.data) {
        surveyData = typeof survey.data === "string" ? JSON.parse(survey.data) : survey.data
      }

      // Get the general information data
      const generalInfo: any = surveyData?.generalInformation
        ? typeof surveyData.generalInformation === "string"
          ? JSON.parse(surveyData.generalInformation)
          : surveyData.generalInformation
        : {}

      // Add these lines after parsing surveyData
      console.log("Survey Data:", surveyData)
      console.log("Companies:", generalInfo?.companies || survey.companies)
      console.log("Trades:", generalInfo?.school?.trades || survey.school?.trades)

      // Parse evaluation data
      const evaluationData = survey.strategicPlanning
        ? typeof survey.strategicPlanning === "string"
          ? JSON.parse(survey.strategicPlanning)
          : survey.strategicPlanning
        : {}

      const evaluationDataOne = survey.operationalManagement
        ? typeof survey.operationalManagement === "string"
          ? JSON.parse(survey.operationalManagement)
          : survey.operationalManagement
        : {}

      const evaluationDataTwo = survey.teachingAndLearning
        ? typeof survey.teachingAndLearning === "string"
          ? JSON.parse(survey.teachingAndLearning)
          : survey.teachingAndLearning
        : {}

      const evaluationDataThree = survey.stakeholdersEngagement
        ? typeof survey.stakeholdersEngagement === "string"
          ? JSON.parse(survey.stakeholdersEngagement)
          : survey.stakeholdersEngagement
        : {}

      const evaluationDataFour = survey.continuousImprovement
        ? typeof survey.continuousImprovement === "string"
          ? JSON.parse(survey.continuousImprovement)
          : survey.continuousImprovement
        : {}

      const evaluationDataFive = survey.infrastructureAndEnvironment
        ? typeof survey.infrastructureAndEnvironment === "string"
          ? JSON.parse(survey.infrastructureAndEnvironment)
          : survey.infrastructureAndEnvironment
        : {}

      // Extract school type for the summary
      const schoolCategory = generalInfo?.school?.category || ""
      const schoolType =
        schoolCategory.toLowerCase().includes("boarding") || schoolCategory.toLowerCase().includes("mixed")
          ? "boarding"
          : "day"

      // Calculate section marks for the summary
      const sectionMarks = {
        strategicPlanning: evaluationData.totalMarks || 0,
        operationalManagement: evaluationDataOne.totalMarks || 0,
        teachingLearning: evaluationDataTwo?.totalMarks || 0,
        stakeholdersEngagement: evaluationDataThree?.totalMarks || 0,
        continuousImprovement: evaluationDataFour?.totalMarks || 0,
        infrastructure: evaluationDataFive?.totalMarks || 0,
      }

      // Calculate total marks
      const totalMarks = Object.values(sectionMarks).reduce((sum: number, mark: any) => sum + Number(mark), 0)

      // Write the HTML content
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Survey Report: ${schoolName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          h1 { color: #2563eb; margin-bottom: 10px; }
          h2 { color: #2563eb; margin-top: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
          h3 { color: #3b82f6; margin-top: 15px; }
          h4 { margin-top: 10px; margin-bottom: 5px; color: #4b5563; }
          .info-row { margin: 8px 0; }
          .info-label { font-weight: bold; }
          .section { margin-bottom: 20px; }
          .subsection { margin-left: 15px; margin-bottom: 15px; }
          .criteria-item { margin-left: 15px; margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #e5e7eb; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th { background-color: #2563eb; color: white; padding: 8px; text-align: left; }
          td { border: 1px solid #e5e7eb; padding: 8px; }
          .meta { color: #6b7280; font-size: 0.9em; margin-bottom: 20px; }
          .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px; background-color: #f9fafb; }
          .tag { display: inline-block; background-color: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 4px; margin: 2px; font-size: 0.85em; }
          .overview { background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 15px; margin-top: 15px; }
          .header-blue { background-color: #dbeafe; padding: 10px; border-radius: 6px; text-align: center; margin-bottom: 15px; }
          .header-blue h3 { color: #1e40af; margin: 0; }
          .progress-container { width: 100%; background-color: #dbeafe; height: 10px; border-radius: 5px; margin: 5px 0; }
          .progress-bar { background-color: #2563eb; height: 10px; border-radius: 5px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .status-good { color: #059669; }
          .status-moderate { color: #d97706; }
          .status-poor { color: #dc2626; }
          @media print {
            body { font-size: 12pt; }
            h1 { font-size: 18pt; }
            h2 { font-size: 14pt; }
            h3 { font-size: 12pt; }
            .no-print { display: none; }
            table { page-break-inside: avoid; }
            tr { page-break-inside: avoid; }
            .section { page-break-inside: avoid; }
            .page-break { page-break-before: always; }
            .card { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print();" style="padding: 8px 16px; background-color: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Print / Save as PDF
          </button>
        </div>
        
        <h1>Survey Report: ${schoolName}</h1>
        <div class="meta">
          <div>Completed on: ${completedDate}</div>
          ${completedBy ? `<div>Completed by: ${completedBy}</div>` : ""}
        </div>
        
        <!-- School Information Section -->
        <div class="section">
          <h2>School Information</h2>
          <div class="grid">
            <div>
              <h4>Basic Information</h4>
              <div class="info-row"><span class="info-label">Name:</span> ${survey.school.name || "N/A"}</div>
              <div class="info-row"><span class="info-label">Status:</span> ${survey.school.status || "N/A"}</div>
              <div class="info-row"><span class="info-label">Category:</span> ${survey.school.category || "N/A"}</div>
            </div>
            
            <div>
              <h4>Contact Information</h4>
              <div class="info-row"><span class="info-label">Email:</span> ${generalInfo?.school?.contact?.email || survey.school?.contact?.email || "N/A"}</div>
              <div class="info-row"><span class="info-label">Phone:</span> ${generalInfo?.school?.contact?.phone || survey.school?.contact?.phone || "N/A"}</div>
              <div class="info-row"><span class="info-label">Head Teacher:</span> ${generalInfo?.school?.contact?.headteacher || survey.school?.contact?.headteacher || "N/A"}</div>
            </div>
          </div>
          
          <div>
            <h4>Staff Statistics</h4>
            <div class="grid">
              <div class="info-row"><span class="info-label">Male Teachers:</span> ${generalInfo?.school?.stats?.maleTeachers || survey.school?.stats?.maleTeachers || "0"}</div>
              <div class="info-row"><span class="info-label">Female Teachers:</span> ${generalInfo?.school?.stats?.femaleTeachers || survey.school?.stats?.femaleTeachers || "0"}</div>
              <div class="info-row"><span class="info-label">Total Teachers:</span> ${
                Number(generalInfo?.school?.stats?.maleTeachers || survey.school?.stats?.maleTeachers || 0) +
                  Number(generalInfo?.school?.stats?.femaleTeachers || survey.school?.stats?.femaleTeachers || 0) || "0"
              }</div>
            </div>
          </div>
          
          ${
            generalInfo?.school?.location || survey.school?.location
              ? `
            <div>
              <h4>Location</h4>
              <div class="grid">
                ${
                  generalInfo?.school?.location?.province || survey.school?.location?.province
                    ? `<div class="info-row"><span class="info-label">Province:</span> ${generalInfo?.school?.location?.province || survey.school?.location?.province}</div>`
                    : ""
                }
                ${
                  generalInfo?.school?.location?.district || survey.school?.location?.district
                    ? `<div class="info-row"><span class="info-label">District:</span> ${generalInfo?.school?.location?.district || survey.school?.location?.district}</div>`
                    : ""
                }
                ${
                  generalInfo?.school?.location?.sector || survey.school?.location?.sector
                    ? `<div class="info-row"><span class="info-label">Sector:</span> ${generalInfo?.school?.location?.sector || survey.school?.location?.sector}</div>`
                    : ""
                }
                ${
                  generalInfo?.school?.location?.cell || survey.school?.location?.cell
                    ? `<div class="info-row"><span class="info-label">Cell:</span> ${generalInfo?.school?.location?.cell || survey.school?.location?.cell}</div>`
                    : ""
                }
                ${
                  generalInfo?.school?.location?.village || survey.school?.location?.village
                    ? `<div class="info-row"><span class="info-label">Village:</span> ${generalInfo?.school?.location?.village || survey.school?.location?.village}</div>`
                    : ""
                }
              </div>
            </div>
          `
              : ""
          }
        </div>
    `)

      // Add companies information if available
      const companies = generalInfo?.companies || survey.companies || []
      if (companies.length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <h2>Company Information</h2>
          
          ${companies
            .map(
              (company, index) => `
            <div class="card">
              <h4>Company ${index + 1}: ${company.name || "Unnamed Company"}</h4>
              <div class="info-row"><span class="info-label">Distance from School:</span> ${company.distance || "N/A"} km</div>
              
              ${
                company.trades && company.trades.length > 0
                  ? `
                <div class="info-row">
                  <span class="info-label">Trades:</span>
                  <div>
                    ${company.trades.map((trade) => `<span class="tag">${trade}</span>`).join(" ")}
                  </div>
                </div>
              `
                  : '<div class="info-row"><span class="info-label">Trades:</span> No trades listed</div>'
              }
            </div>
          `,
            )
            .join("")}
        </div>
      `)
      }

      // Add trades information if available
      const trades = generalInfo?.school?.trades || survey.school?.trades || []
      if (trades.length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <h2>Trade Information</h2>
          
          ${trades
            .map(
              (trade, index) => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="margin: 0;">${trade.name || `Trade ${index + 1}`}</h4>
                ${trade.id ? `<span style="font-size: 0.8em; color: #4b5563;">ID: ${trade.id}</span>` : ""}
              </div>
              
              ${
                trade.shortCourse
                  ? `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb;">
                  <h5 style="margin-top: 0; margin-bottom: 8px;">Short Course</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Virtual Classrooms</th>
                        <th>Physical Classrooms</th>
                        <th>Male Students</th>
                        <th>Female Students</th>
                        <th>Total Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>${trade.shortCourse.virtualClassrooms || "0"}</td>
                        <td>${trade.shortCourse.physicalClassrooms || "0"}</td>
                        <td>${trade.shortCourse.students?.male || "0"}</td>
                        <td>${trade.shortCourse.students?.female || "0"}</td>
                        <td>${Number(trade.shortCourse.students?.male || 0) + Number(trade.shortCourse.students?.female || 0) || "0"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              `
                  : ""
              }
              
              ${
                trade.levels && trade.levels.length > 0
                  ? `
                <div style="margin-top: 15px;">
                  <h5 style="margin-top: 0; margin-bottom: 8px;">Levels</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Virtual Classrooms</th>
                        <th>Physical Classrooms</th>
                        <th>Male Students</th>
                        <th>Female Students</th>
                        <th>Total Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${trade.levels
                        .map((level, levelIndex) => {
                          const maleStudents = Number(level.students?.male || 0)
                          const femaleStudents = Number(level.students?.female || 0)
                          const totalStudents = maleStudents + femaleStudents

                          return `
                          <tr>
                            <td>${level.level || levelIndex + 1}</td>
                            <td>${level.virtualClassrooms || "0"}</td>
                            <td>${level.physicalClassrooms || "0"}</td>
                            <td>${maleStudents}</td>
                            <td>${femaleStudents}</td>
                            <td>${totalStudents}</td>
                          </tr>
                        `
                        })
                        .join("")}
                    </tbody>
                  </table>
                </div>
              `
                  : "<p>No level information available</p>"
              }
            </div>
          `,
            )
            .join("")}
        </div>
      `)
      }

      // Add infrastructure information if available
      const infrastructure = generalInfo?.infrastructure || survey.infrastructure || []
      if (infrastructure.length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <h2>Infrastructure</h2>
          
          ${infrastructure
            .map(
              (item, index) => `
            <div class="card">
              <h4 style="margin-top: 0;">${item.type || `Infrastructure ${index + 1}`}</h4>
              
              <div class="grid">
                ${item.size ? `<div class="info-row"><span class="info-label">Size:</span> ${item.size} sq. m</div>` : ""}
                ${item.capacity ? `<div class="info-row"><span class="info-label">Capacity:</span> ${item.capacity}</div>` : ""}
                ${item.constructionYear ? `<div class="info-row"><span class="info-label">Construction Year:</span> ${item.constructionYear}</div>` : ""}
                <div class="info-row">
                  <span class="info-label">Status:</span> 
                  <span class="${
                    item.status === "good"
                      ? "status-good"
                      : item.status === "moderate"
                        ? "status-moderate"
                        : item.status === "poor"
                          ? "status-poor"
                          : ""
                  }">${item.status || "N/A"}</span>
                </div>
              </div>
              
              ${
                item.materials && item.materials.length > 0
                  ? `
                <div class="info-row">
                  <span class="info-label">Construction Materials:</span>
                  <div>
                    ${item.materials.map((material) => `<span class="tag">${material}</span>`).join(" ")}
                  </div>
                </div>
              `
                  : ""
              }
            </div>
          `,
            )
            .join("")}
        </div>
      `)
      }

      // Add IT infrastructure information if available
      const it = generalInfo?.it || survey.it || {}
      if (Object.keys(it).length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <h2>IT Infrastructure</h2>
          
          ${
            it.computerLab
              ? `
            <div class="card">
              <h4>Computer Lab</h4>
              <div class="grid">
                <div class="info-row"><span class="info-label">Total Computers:</span> ${it.computerLab.totalComputers || "0"}</div>
                <div class="info-row"><span class="info-label">Working Computers:</span> ${it.computerLab.workingComputers || "0"}</div>
                <div class="info-row"><span class="info-label">Non-Working Computers:</span> ${it.computerLab.nonWorkingComputers || "0"}</div>
                <div class="info-row"><span class="info-label">Connected with LAN:</span> ${it.computerLab.hasLAN ? "Yes" : "No"}</div>
                <div class="info-row"><span class="info-label">Has Projectors:</span> ${it.computerLab.hasProjectors ? "Yes" : "No"}</div>
                
                ${
                  it.computerLab.hasProjectors
                    ? `
                  <div class="info-row"><span class="info-label">Total Projectors:</span> ${it.computerLab.totalProjectors || "0"}</div>
                  <div class="info-row"><span class="info-label">Working Projectors:</span> ${it.computerLab.workingProjectors || "0"}</div>
                  <div class="info-row"><span class="info-label">Non-Working Projectors:</span> ${it.computerLab.nonWorkingProjectors || "0"}</div>
                `
                    : ""
                }
              </div>
            </div>
          `
              : ""
          }
          
          ${
            it.internet || it.server
              ? `
            <div class="card">
              <h4>Internet & Server</h4>
              <div class="grid">
                ${
                  it.internet
                    ? `
                  <div class="info-row"><span class="info-label">Internet Available:</span> ${it.internet.exists ? "Yes" : "No"}</div>
                  ${it.internet.exists && it.internet.type ? `<div class="info-row"><span class="info-label">Internet Type:</span> ${it.internet.type}</div>` : ""}
                `
                    : ""
                }
                
                ${
                  it.server
                    ? `
                  <div class="info-row"><span class="info-label">Has Server:</span> ${it.server.exists ? "Yes" : "No"}</div>
                  ${it.server.exists && it.server.specifications ? `<div class="info-row"><span class="info-label">Server Specifications:</span> ${it.server.specifications}</div>` : ""}
                `
                    : ""
                }
              </div>
            </div>
          `
              : ""
          }
          
          ${
            it.energySources && it.energySources.length > 0
              ? `
            <div class="card">
              <h4>Energy Sources</h4>
              <div>
                ${it.energySources.map((source) => `<span class="tag">${source}</span>`).join(" ")}
              </div>
            </div>
          `
              : ""
          }
          
          ${
            it.equipment
              ? `
            <div class="card">
              <h4>Equipment Asset Register</h4>
              <div class="grid">
                <div class="info-row"><span class="info-label">Has Asset Register:</span> ${it.equipment.hasAssetRegister ? "Yes" : "No"}</div>
                <div class="info-row">
                  <span class="info-label">Status:</span>
                  <span class="${
                    it.equipment.status === "good"
                      ? "status-good"
                      : it.equipment.status === "moderate"
                        ? "status-moderate"
                        : it.equipment.status === "poor"
                          ? "status-poor"
                          : ""
                  }">${it.equipment.status || "N/A"}</span>
                </div>
                ${it.equipment.isAvailable !== undefined ? `<div class="info-row"><span class="info-label">Is Available:</span> ${it.equipment.isAvailable ? "Yes" : "No"}</div>` : ""}
              </div>
            </div>
          `
              : ""
          }
        </div>
      `)
      }

      // Function to render evaluation table
      const renderEvaluationTable = (data, items) => {
        if (!data || !items || items.length === 0) return ""

        const calculateTableTotal = (items, data) => {
          return items.reduce((total, item) => {
            if (item.isHeader) return total // Skip header rows

            const availability =
              (data?.[item.key]?.availability ?? item.availability) === -1
                ? 0
                : (data?.[item.key]?.availability ?? item.availability)

            const quality =
              (data?.[item.key]?.quality ?? item.quality) === -1 ? 0 : (data?.[item.key]?.quality ?? item.quality)

            return total + Number(availability) + Number(quality)
          }, 0)
        }

        const tableTotal = calculateTableTotal(items, data)

        return `
        <table>
          <thead>
            <tr>
              <th style="width: 33%;">Evaluation area/Achievement indicators</th>
              <th style="width: 10%;">Availability (Weight: 40%)</th>
              <th style="width: 10%;">Quality (Weight: 60%)</th>
              <th style="width: 10%;">Marks allocated</th>
              <th style="width: 10%;">Marks Obtained</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map((item, index) => {
                if (item.isHeader) {
                  return `
                  <tr style="background-color: #dbeafe; font-weight: bold;">
                    <td colspan="6">${item.indicator}</td>
                  </tr>
                `
                }

                const availability =
                  (data?.[item.key]?.availability ?? item.availability) === -1
                    ? "N/A"
                    : (data?.[item.key]?.availability ?? item.availability)

                const quality =
                  (data?.[item.key]?.quality ?? item.quality) === -1
                    ? "N/A"
                    : (data?.[item.key]?.quality ?? item.quality)

                const marksObtained =
                  (availability === "N/A" ? 0 : Number(availability)) + (quality === "N/A" ? 0 : Number(quality))

                return `
                <tr style="background-color: ${index % 2 === 0 ? "white" : "#f9fafb"};">
                  <td style="font-weight: 500;">${item.indicator}</td>
                  <td style="text-align: center;">${availability}</td>
                  <td style="text-align: center;">${quality}</td>
                  <td style="text-align: center;">${data?.[item.key]?.marksAllocated ?? item.marksAllocated}</td>
                  <td style="text-align: center;">${marksObtained}</td>
                  <td>${data?.[item.key]?.observation?.trim() || "No Observations made"}</td>
                </tr>
              `
              })
              .join("")}
            <tr style="background-color: #dbeafe; font-weight: bold;">
              <td colspan="5" style="text-align: right;">Total Marks:</td>
              <td style="text-align: center;">${tableTotal || "0"}</td>
            </tr>
          </tbody>
        </table>
      `
      }

      // Function to render overview
      const renderOverview = (data) => {
        if (!data || !data.overview) return ""

        return `
        <div class="overview">
          <h4 style="margin-top: 0; margin-bottom: 10px;">Overview of the findings</h4>
          <div>
            <p style="font-weight: 500; margin-bottom: 5px;">Strength:</p>
            <p style="background-color: white; padding: 8px; border: 1px solid #e5e7eb; border-radius: 4px;">${data.overview.strength || "Not provided"}</p>
          </div>
          <div style="margin-top: 10px;">
            <p style="font-weight: 500; margin-bottom: 5px;">Weakness:</p>
            <p style="background-color: white; padding: 8px; border: 1px solid #e5e7eb; border-radius: 4px;">${data.overview.weakness || "Not provided"}</p>
          </div>
          <div style="margin-top: 10px;">
            <p style="font-weight: 500; margin-bottom: 5px;">Area of improvement:</p>
            <p style="background-color: white; padding: 8px; border: 1px solid #e5e7eb; border-radius: 4px;">${data.overview.improvement || "Not provided"}</p>
          </div>
        </div>
      `
      }

      // Strategic Planning Section
      if (Object.keys(evaluationData).length > 0) {
        const strategicPlan = evaluationData?.strategicPlanning || evaluationData || {}

        const strategicPlanningItems = [
          {
            key: "strategicPlanningHeader",
            indicator: "1.1 Strategic Planning (6 marks)",
            isHeader: true,
            marksAllocated: "",
          },
          {
            key: "strategicPlan",
            indicator: "Approved Strategic plan (Signed by the right authority)",
            availability: strategicPlan.strategicPlan?.availability || "N/A",
            quality: strategicPlan.strategicPlan?.quality || "N/A",
            marksAllocated: strategicPlan.strategicPlan?.marksAllocated || "N/A",
          },
          {
            key: "schoolVision",
            indicator: "School vision",
            availability: strategicPlan.schoolVision?.availability || "N/A",
            quality: strategicPlan.schoolVision?.quality || "N/A",
            marksAllocated: strategicPlan.schoolVision?.marksAllocated || "0.5",
          },
          {
            key: "schoolMission",
            indicator: "School mission",
            availability: strategicPlan.schoolMission?.availability || "N/A",
            quality: strategicPlan.schoolMission?.quality || "N/A",
            marksAllocated: strategicPlan.schoolMission?.marksAllocated || "0.5",
          },
          {
            key: "organizationalStructure",
            indicator: "Organizational structure",
            availability: strategicPlan.organizationalStructure?.availability || "N/A",
            quality: strategicPlan.organizationalStructure?.quality || "N/A",
            marksAllocated: strategicPlan.organizationalStructure?.marksAllocated || "0.5",
          },
          {
            key: "operationalBudget",
            indicator: "Operational budget",
            availability: strategicPlan.operationalBudget?.availability || "N/A",
            quality: strategicPlan.operationalBudget?.quality || "N/A",
            marksAllocated: strategicPlan.operationalBudget?.marksAllocated || "0.5",
          },
          {
            key: "annualBudgetHeader",
            indicator: "1.2 Annual budget and Procurement plan (4 marks)",
            isHeader: true,
            marksAllocated: "",
          },
          {
            key: "annualBudgetPlan",
            indicator: "Approved Strategic plan (Signed by the right authority)",
            availability: strategicPlan.annualBudgetPlan?.availability || "N/A",
            quality: strategicPlan.annualBudgetPlan?.quality || "N/A",
            marksAllocated: strategicPlan.annualBudgetPlan?.marksAllocated || "0.5",
          },
          {
            key: "procurementPlan",
            indicator: "Approved procurement plan",
            availability: strategicPlan.procurementPlan?.availability || "N/A",
            quality: strategicPlan.procurementPlan?.quality || "N/A",
            marksAllocated: strategicPlan.procurementPlan?.marksAllocated || "0.5",
          },
          {
            key: "businessPlan",
            indicator: "Business Plan for production unit",
            availability: strategicPlan.businessPlan?.availability || "N/A",
            quality: strategicPlan.businessPlan?.quality || "N/A",
            marksAllocated: strategicPlan.businessPlan?.marksAllocated || "0.5",
          },
          {
            key: "tenderCommittee",
            indicator: "Tender and receiving committee appointed (Valid appointment letter)",
            availability: strategicPlan.tenderCommittee?.availability || "N/A",
            quality: strategicPlan.tenderCommittee?.quality || "N/A",
            marksAllocated: strategicPlan.tenderCommittee?.marksAllocated || "0.5",
          },
        ]

        printWindow.document.write(`
        <div class="section page-break">
          <div class="header-blue">
            <h3>1. Strategic Planning (10 Marks)</h3>
          </div>
          
          ${renderEvaluationTable(evaluationData, strategicPlanningItems)}
          ${renderOverview(evaluationData)}
        </div>
      `)
      }

      // Operational Management Section
      if (Object.keys(evaluationDataOne).length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <div class="header-blue">
            <h3>2. School Operational Management (30 Marks)</h3>
          </div>
          
          ${renderEvaluationTable(evaluationDataOne, [])}
          ${renderOverview(evaluationDataOne)}
        </div>
      `)
      }

      // Teaching and Learning Section
      if (Object.keys(evaluationDataTwo).length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <div class="header-blue">
            <h3>3. Leading Teaching and Learning (20 Marks)</h3>
          </div>
          
          ${renderEvaluationTable(evaluationDataTwo, [])}
          ${renderOverview(evaluationDataTwo)}
        </div>
      `)
      }

      // Stakeholders Engagement Section
      if (Object.keys(evaluationDataThree).length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <div class="header-blue">
            <h3>4. Stakeholders' Engagement (10 Marks)</h3>
          </div>
          
          ${renderEvaluationTable(evaluationDataThree, [])}
          ${renderOverview(evaluationDataThree)}
        </div>
      `)
      }

      // Continuous Improvement Section
      if (Object.keys(evaluationDataFour).length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <div class="header-blue">
            <h3>5. Continuous Improvement (10 Marks)</h3>
          </div>
          
          ${renderEvaluationTable(evaluationDataFour, [])}
          ${renderOverview(evaluationDataFour)}
        </div>
      `)
      }

      // Infrastructure and Environment Section
      if (Object.keys(evaluationDataFive).length > 0) {
        printWindow.document.write(`
        <div class="section page-break">
          <div class="header-blue">
            <h3>6. Infrastructure and Environment (Hygiene and Safety) (20 Marks)</h3>
            ${schoolType === "day" ? '<p style="font-size: 0.9em; color: #3b82f6; margin-top: 5px;">Day School</p>' : ""}
            ${schoolType === "boarding" ? '<p style="font-size: 0.9em; color: #3b82f6; margin-top: 5px;">Boarding School</p>' : ""}
          </div>
          
          ${renderEvaluationTable(evaluationDataFive, [])}
          ${renderOverview(evaluationDataFive)}
        </div>
      `)
      }

      // Results Summary Section
      printWindow.document.write(`
      <div class="section page-break">
        <div class="header-blue">
          <h3>Evaluation Results Summary</h3>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div>
            <p style="font-size: 0.9em; font-weight: 500; color: #3b82f6;">School Type:</p>
            <p style="font-size: 1.1em; font-weight: 600;">${schoolType === "day" ? "Day School" : "Boarding School"}</p>
          </div>
          
          <div>
            <p style="font-size: 0.9em; font-weight: 500; color: #3b82f6;">Total Score:</p>
            <p style="font-size: 1.5em; font-weight: 700; color: #1e40af;">${totalMarks.toFixed(2)} / 100</p>
          </div>
        </div>
        
        <div>
          ${[
            { key: "strategicPlanning", name: "Strategic Planning", max: 10 },
            { key: "operationalManagement", name: "School Operational Management", max: 30 },
            { key: "teachingLearning", name: "Leading Teaching and Learning", max: 20 },
            { key: "stakeholdersEngagement", name: "Stakeholders' Engagement", max: 10 },
            { key: "continuousImprovement", name: "Continuous Improvement", max: 10 },
            { key: "infrastructure", name: "Infrastructure and Environment", max: 20 },
          ]
            .map(
              (section, index) => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.9em; font-weight: 500;">
                  ${index + 1}. ${section.name}
                </span>
                <span style="font-weight: 600;">
                  ${sectionMarks[section.key].toFixed(2)} / ${section.max}
                </span>
              </div>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${(sectionMarks[section.key] / section.max) * 100}%;"></div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
          <h4 style="margin-top: 0; margin-bottom: 10px; color: #3b82f6;">Evaluation Summary</h4>
          <p style="font-size: 0.9em; color: #1e40af;">
            This evaluation tool has assessed your institution across six key areas. Your total score is ${totalMarks.toFixed(2)} out of 100.
            ${
              totalMarks >= 80
                ? " Your institution demonstrates excellent performance across most evaluation criteria."
                : totalMarks >= 60
                  ? " Your institution demonstrates good performance with some areas for improvement."
                  : totalMarks >= 40
                    ? " Your institution meets basic requirements but has significant areas for improvement."
                    : " Your institution requires substantial improvements across multiple evaluation criteria."
            }
          </p>
        </div>
        
        <div style="margin-top: 30px;">
          <h4 style="color: #3b82f6;">Evaluator's Comments</h4>
          <div style="width: 100%; height: 100px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; background-color: white; margin-bottom: 15px;"></div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
            <div>
              <p style="font-size: 0.9em; font-weight: 500; color: #3b82f6;">Evaluator's Signature 1</p>
              <div style="width: 100%; height: 40px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: white;"></div>
            </div>
            <div>
              <p style="font-size: 0.9em; font-weight: 500; color: #3b82f6;">Evaluator's Signature 2</p>
              <div style="width: 100%; height: 40px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: white;"></div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 30px;">
          <h4 style="color: #3b82f6;">Headteacher's Comments</h4>
          <div style="width: 100%; height: 100px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; background-color: white; margin-bottom: 15px;"></div>
          
          <div style="margin-top: 15px;">
            <p style="font-size: 0.9em; font-weight: 500; color: #3b82f6;">Headteacher's Signature</p>
            <div style="width: 100%; height: 40px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: white;"></div>
          </div>
        </div>
      </div>
    `)

      // Close the HTML document
      printWindow.document.write(`
        <div class="no-print" style="margin-top: 30px; text-align: center; color: #6b7280;">
          <p>To save as PDF, use your browser's print function (Ctrl+P or Cmd+P) and select "Save as PDF" as the destination.</p>
        </div>
      </body>
      </html>
    `)

      printWindow.document.close()

      // Trigger print dialog after content is loaded
      printWindow.onload = () => {
        // Give a moment for styles to apply
        setTimeout(() => {
          printWindow.focus()
          // Uncomment the line below to automatically open the print dialog
          // printWindow.print();
          setIsDownloading(false)
        }, 500)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
      setIsDownloading(false)
    }
  }

  const { surveys, fetchingSurveys, errorFetchingSurveys } = useAllSurveys()

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Completed Surveys</h1>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
        >
          Back
        </Button>

        {errorFetchingSurveys && (
          <div className="bg-white rounded-lg shadow border border-blue-200 p-6">
            <p className="text-gray-700 text-center">Error loading surveys. Please try again.</p>
          </div>
        )}

        {fetchingSurveys ? (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow border border-blue-200">
            {surveys?.length > 0 ? (
              surveys.map((survey: Survey, index: number) => (
                <div
                  key={index}
                  className="p-4 border-b border-blue-100 last:border-b-0 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{survey.school.name}</h3>
                    <div className="flex gap-4">
                      <p className="text-sm text-gray-600">
                        Completed on {dayjs(survey.createdAt).format("DD/MM/YYYY")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Completed By {(survey.completedBy?.firstName || "") + " " + survey.completedBy?.lastName || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownloadSurvey(survey)}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
                      title="Download as PDF"
                      disabled={isDownloading}
                    >
                      <Download className={`h-4 w-4 ${isDownloading ? "animate-pulse" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handlePreviewSurvey(survey)}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">No completed surveys yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Survey Preview Popup */}
      {selectedSurvey && (
        <SurveyPreviewDialog
          survey={selectedSurvey} // Passing school ID here
          open={previewOpen}
          onOpenChange={setPreviewOpen}
        />
      )}
    </div>
  )
}

export default CompletedSurveys

