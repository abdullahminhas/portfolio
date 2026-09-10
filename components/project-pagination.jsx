"use client";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProjectPagination = ({ totalPages, currentPage, onPageChange }) => {
  const [pagesToShow, setPagesToShow] = useState([]);

  useEffect(() => {
    const generatePagesToShow = () => {
      const maxPagesToShow = 3; // Adjust this value to control the number of pages shown
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
      setPagesToShow(pages);
    };
    generatePagesToShow();
  }, [currentPage, totalPages]);

  const handleClick = (page) => {
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    return pagesToShow.map((page) => (
      <PaginationItem key={page}>
        <PaginationLink
          className={currentPage === page ? "cursor-default" : "cursor-pointer"}
          onClick={() => handleClick(page)}
          isActive={currentPage === page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <React.Fragment>
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 1 ? "cursor-default hover:bg-transparent" : "cursor-pointer"
              }
              onClick={() => {
                if (currentPage !== 1) {
                  handleClick(currentPage - 1);
                }
              }}
            />
          </PaginationItem>
          )}
          {pagesToShow[0] > 1 && (
            <React.Fragment>
              <PaginationItem>
                <PaginationLink
                  className={
                    currentPage === 1 ? "cursor-default" : "cursor-pointer"
                  }
                  onClick={() => handleClick(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {pagesToShow[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </React.Fragment>
          )}
          {renderPaginationButtons()}
          {pagesToShow[pagesToShow.length - 1] < totalPages && (
            <React.Fragment>
              {pagesToShow[pagesToShow.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  className={
                    currentPage === totalPages
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                  onClick={() => handleClick(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </React.Fragment>
          )}
          {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext
              className={
                currentPage === totalPages ? "cursor-default hover:bg-transparent" : "cursor-pointer"
              }
              onClick={() => {
                if (currentPage !== totalPages) {
                  handleClick(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </React.Fragment>
  );
};

export default ProjectPagination;