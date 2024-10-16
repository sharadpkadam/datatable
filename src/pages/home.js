// pages/index.js
import React, { useEffect, useState } from 'react';
import AdvancedTable from '../components/advanceDataTable';

const Home = () => {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    // Fetch the data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products'); 
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Define columns based on the provided sample data
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Category', accessor: 'category' },
    { Header: 'Subcategory', accessor: 'subcategory' },
    { Header: 'Created At', accessor: 'createdAt', Cell: ({ value }) => new Date(value).toLocaleDateString() }, 
    { Header: 'Updated At', accessor: 'updatedAt', Cell: ({ value }) => new Date(value).toLocaleDateString() }, 
    { Header: 'Price', accessor: 'price' },
    { Header: 'Sale Price', accessor: 'sale_price' }
  ];

  return (
    <div>
      <h1>Advanced Data Table</h1>
      <AdvancedTable columns={columns} data={tableData} />
    </div>
  );
};

export default Home;
