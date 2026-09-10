"use client"
import React, { useState, useEffect, useMemo } from "react"
import { ProjectCard } from "./project-card"
import BlurFade from "./ui/blur-fade"
import { RadioGroup } from "./ui/radio-group"
import RadioButton from "./ui/radio-button"
import ProjectPagination from "./project-pagination"
import { Badge } from "./ui/badge"

const Projects = ({ projects, BLUR }) => {
  const [filter, setFilter] = useState("all")

  const filteredProjects = useMemo(() => {
    return filter === "all"
      ? projects
      : projects.filter((project) => project.filter === filter)
  }, [projects, filter])

  const [itemsToShow, setItemsToShow] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page)
  }
  //   showing 4 projects
  const ITEMS_PER_PAGE = 3
  const totalItems = filteredProjects.length // Total number of items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems)

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  useEffect(() => {
    // Assuming you have a list of items
    setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE))
    setItemsToShow([...filteredProjects].slice(startIndex, endIndex))
  }, [filteredProjects, startIndex, endIndex, totalItems])

  return (
    <div className="flex flex-col gap-4">
      <BlurFade delay={BLUR + 0.1}>
        <div className="flex items-center justify-between">
          <RadioGroup
            defaultValue="all"
            className="flex"
            value={filter}
            onValueChange={(val) => setFilter(val)}
          >
            <RadioButton id="r1" value="all" label="All" />
            <RadioButton id="r2" value="shopify" label="Shopify" />
            <RadioButton id="r3" value="next" label="Next.js" />
            <RadioButton id="r4" value="c++" label="C++" />
          </RadioGroup>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            {projects.length} Projects
          </span>
        </div>
      </BlurFade>
      <div className="flex flex-col gap-4">
        {projects &&
          itemsToShow.map((project, index) => (
            <BlurFade key={project.title} delay={BLUR + index * 0.05}>
              {/* <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              /> */}
              <ProjectCard key={project.title} index={index} {...project} />
            </BlurFade>
          ))}
      </div>
      {/* we can show the pagination once we have more than 4 projects */}
      {totalItems > ITEMS_PER_PAGE ? (
        <BlurFade delay={BLUR + 0.3}>
          <div className="mt-3">
            <ProjectPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </BlurFade>
      ) : null}
    </div>
  )
}

export default Projects
