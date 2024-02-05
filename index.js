import React, { useState } from "react";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import { motion } from "framer-motion";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";

const AutoTable = ({ columns, rows, showPagination, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState([]);

  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleRow = (rowIndex) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(rowIndex)
        ? prevExpandedRows.filter((row) => row !== rowIndex)
        : [...prevExpandedRows, rowIndex]
    );
  };

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = showPagination
    ? rows.slice(indexOfFirstItem, indexOfLastItem)
    : rows;

  return (
    <motion.div
      variants={{
        visible: { x: 0, opacity: 1, filter: "blur(0px)" },
        hidden: { x: 75, opacity: 0, filter: "blur(8px)" },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.7, delay: 0.25 }}
    >
      {/* Export button */}
      <div className="mb-2 float-end flex items-center">
        <div className="text-gray-500 ml-2">کل موارد: {rows?.length}</div>
        {/* <button
          onClick={handleExportToExcel}
          className={
            "flex items-center transition-transform duration-300 ease-in-out transform px-3 py-1 hover:scale-105 mx-1 rounded-full text-sm focus:outline-none bg-blue-500 text-white"
          }
        >
          خروجی اکسل <HiDocumentText className="mr-2" size={18} />
        </button> */}
      </div>
      <div className="overflow-x-auto w-full ">
        <div className="mb-2 self-end">
          <div className="hidden md:block">
            <table className="w-full divide-y divide-gray-200 border border-gray-200">
              <thead className="bg-blue-400 dark:bg-neutral-800">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-200"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="transition-colors hover:bg-blue-100 dark:hover:bg-neutral-700"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 border border-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile mode  */}
          <div className="block md:hidden mb-2">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 justify-center">
              {currentRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  {row.slice(0, 6).map((cell, cellIndex) => (
                    <React.Fragment key={cellIndex}>
                      <div className="text-gray-700 font-bold  text-center">
                        {columns[cellIndex]}
                      </div>
                      <div className="mb-4  text-center">{cell}</div>
                      {cellIndex !== row.length - 1 && (
                        <hr className="my-2 border-gray-200 " />
                      )}
                    </React.Fragment>
                  ))}
                  {row.length > 6 && (
                    <div
                      className={`overflow-hidden ${
                        expandedRows.includes(rowIndex) ? "h-auto" : "h-0"
                      } transition-all`}
                    >
                      {row.slice(6).map((cell, cellIndex) => (
                        <React.Fragment key={cellIndex}>
                          <div className="fmb-2 text-gray-700 font-bold  text-center">
                            {columns[cellIndex + 6]}
                          </div>
                          <div className="mb-4  text-center">{cell}</div>
                          {cellIndex !== row.length - 7 && (
                            <hr className="my-2 border-gray-200 " />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  {row.length > 6 && (
                    <div
                      className="text-gray-500 text-sm font-medium underline mb-2 cursor-pointer flex justify-center items-center"
                      onClick={() => toggleRow(rowIndex)}
                    >
                      {expandedRows.includes(rowIndex) ? (
                        <HiChevronDoubleUp className="h-5 w-5" />
                      ) : (
                        <HiChevronDoubleDown className="h-5 w-5" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4 mt-2">
        {showPagination && (
          <>
            <div className="flex items-center">
              <span className="mr-2 ml-2 text-gray-600">تعداد آیتم: </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm px-2 py-1"
              >
                {[10, 20, 30, 50, 100, 300].map((perPage) => (
                  <option
                    key={perPage}
                    value={perPage}
                    className="text-gray-900"
                  >
                    {perPage}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center ml-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="transition-transform duration-300 ease-in-out transform hover:scale-110 px-3 py-1 rounded-md text-sm text-gray-500 focus:outline-none"
              >
                <HiChevronDoubleRight />
              </button>
              {currentPage > 1 && (
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`transition-transform duration-300 ease-in-out transform hover:scale-110 mx-1 px-3 py-1 rounded-full text-sm focus:outline-none bg-gray-200 text-gray-700 hover:bg-gray-300`}
                >
                  {currentPage - 1}
                </button>
              )}

              <button
                onClick={() => paginate(currentPage)}
                className={`transition-transform duration-300 ease-in-out transform hover:scale-110 mx-1 px-3 py-1 rounded-full text-sm focus:outline-none bg-blue-500 text-white`}
              >
                {currentPage}
              </button>

              <button
                onClick={() => paginate(currentPage + 1)}
                className={`transition-transform duration-300 ease-in-out transform hover:scale-110 mx-1 px-3 py-1 rounded-full text-sm focus:outline-none bg-gray-200 text-gray-700 hover:bg-gray-300`}
              >
                {currentPage + 1}
              </button>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="transition-transform duration-300 ease-in-out transform hover:scale-110 px-3 py-1 rounded-md text-sm text-gray-500 focus:outline-none"
              >
                <HiChevronDoubleLeft />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AutoTable;
module.exports = AutoTable;
