import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import SearchButton from './searchButton';
import EyeButton from './eyeButton';
import SortButton from './sortButton';
import FilterButton from './filterButton';
import SettingsButton from './settingButton';

const AdvancedTable = ({ columns }) => {
  const [columnVisibility, setColumnVisibility] = useState(
    columns.map(() => true)
  );
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const result = await response.json();
        setData(result);
        setFilteredData(result); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value || "";
    setSearchInput(value);
    const lowercasedFilter = value.toLowerCase();

    const filtered = data.filter((item) => {
      return Object.keys(item).some(
        (key) =>
          item[key] &&
          item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredData(filtered);
  };

  const toggleColumnVisibility = (index) => {
    setColumnVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const visibleColumns = useMemo(
    () => columns.filter((_, index) => columnVisibility[index]),
    [columnVisibility, columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: visibleColumns,
      data: filteredData, 
      initialState: { pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
    setActiveDropdown(showFilter ? null : "filter");
  };

  const handleSortClick = () => {
    setShowSort(!showSort);
    setActiveDropdown(showSort ? null : "sort");
  };

  const handleEyeClick = () => {
    setShowEye(!showEye);
    setActiveDropdown(showEye ? null : "columns");
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortCriteria(sortValue);
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortValue === "id") return a.id - b.id;
      if (sortValue === "name") return a.name.localeCompare(b.name);
      if (sortValue === "category") return a.category.localeCompare(b.category);
      if (sortValue === "subcategory") return a.subcategory.localeCompare(b.subcategory);
      if (sortValue === "createdAt") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortValue === "updatedAt") return new Date(a.updatedAt) - new Date(b.updatedAt);
      if (sortValue === "price") return a.price - b.price;
      if (sortValue === "salePrice") return a.salePrice - b.salePrice;
      return 0;
    });

    setFilteredData(sortedData);
  };

  return (
    <div className="table-container">
      <div className="table-controls">
        <SearchButton searchInput={searchInput} handleSearch={handleSearch} />
        <EyeButton
          showEye={showEye}
          toggleEye={handleEyeClick}
          columns={columns}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
        />
        <SortButton
          showSort={showSort}
          handleSortClick={handleSortClick}
          sortCriteria={sortCriteria}
          handleSortChange={handleSortChange}
        />
        <FilterButton
          showFilter={showFilter}
          handleFilterClick={handleFilterClick}
          data={data}
          setFilteredData={setFilteredData}
        />
        <SettingsButton onClick={() => {/* Handle settings modal or functionality */}} />
      </div>

      <table {...getTableProps()} className="advanced-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => previousPage()} disabled={pageIndex === 0}>
          Previous
        </button>
        {[...Array(pageCount).keys()].map((i) => (
          <button
            key={i}
            className={`pagination-btn ${pageIndex === i ? "active" : ""}`}
            onClick={() => gotoPage(i)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => nextPage()} disabled={pageIndex === pageCount - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdvancedTable;

