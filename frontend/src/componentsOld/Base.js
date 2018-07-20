import React from 'react'
import { renderRoutes } from 'react-router-config'

// Pure Function - Standard Layout
const Base = ({ route }) => {
  return (
  <div>
    {renderRoutes(route.routes)}
  </div>
)}

export default Base
