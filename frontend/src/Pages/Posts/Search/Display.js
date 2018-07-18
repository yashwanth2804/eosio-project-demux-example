import React from "react"

const Display = ({ peopleFiltered, onKeyPress, Filters, }) => (
  <div>
    <input
      placeholder="Search"
      onKeyPress={onKeyPress}
    />
    <h1>Results for {Filters}</h1>
    {peopleFiltered.map(({ id, participant_name, account_number }) => (
      <li key={id}>
        <strong>{participant_name}</strong><br />
        {account_number}
      </li>
    ))}
  </div>
)

export default Display
