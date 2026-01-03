import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Brain, Database, Cloud, ChevronRight, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PROJECTS, EDUCATION, EXPERIENCES } from '../../constants';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-primary-50 to-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-primary-200/40 blur-[80px]" />
        <div className="absolute bottom-20 left-0 h-72 w-72 rounded-full bg-accent-data/10 blur-[60px]" />
        
        <div className="relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex w-max items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 shadow-sm">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
              Open to Work - 2024
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl">
              Acobe Ange Ulrich BONI
            </h1>
            <h2 className="mb-8 text-2xl font-semibold text-neutral-700 md:text-3xl">
              Turning Data into <span className="bg-gradient-to-r from-primary-600 to-accent-dev bg-clip-text text-transparent">Intelligent Action</span>
            </h2>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-600 md:text-xl">
              Engineering Student specializing in <span className="font-semibold text-neutral-900">Deep Learning</span> and <span className="font-semibold text-neutral-900">Big Data</span>. 
              Building scalable AI solutions to solve complex real-world problems.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/projects">
                <Button size="lg" className="group shadow-lg shadow-primary-500/20">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Download className="ml-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="grid gap-6 md:grid-cols-3">
          <Card hoverEffect className="group border-t-4 border-t-accent-dev">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-accent-dev group-hover:bg-accent-dev group-hover:text-white transition-colors">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-neutral-900">Machine Learning</h3>
            <p className="text-neutral-500">Developing advanced algorithms using TensorFlow & PyTorch. Specialization in Computer Vision and NLP.</p>
          </Card>
          
          <Card hoverEffect className="group border-t-4 border-t-accent-data">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-accent-data group-hover:bg-accent-data group-hover:text-white transition-colors">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-neutral-900">Big Data Engineering</h3>
            <p className="text-neutral-500">Architecting data pipelines with Apache Spark, Hadoop, and Kafka. Handling TB-scale datasets efficiently.</p>
          </Card>
          
          <Card hoverEffect className="group border-t-4 border-t-accent-cloud">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-accent-cloud group-hover:bg-accent-cloud group-hover:text-white transition-colors">
              <Cloud className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-neutral-900">MLOps & Cloud</h3>
            <p className="text-neutral-500">End-to-end model deployment on AWS/GCP. Dockerizing applications and managing CI/CD pipelines.</p>
          </Card>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Featured Projects</h2>
            <p className="mt-2 text-neutral-500">A selection of my recent technical work.</p>
          </div>
          <Link to="/projects" className="hidden text-primary-600 hover:text-primary-700 md:flex md:items-center font-medium">
            View all projects <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(0, 3).map((project) => (
            <Card key={project.id} hoverEffect className="flex flex-col p-0 border-neutral-200">
              <div className="relative h-48 w-full overflow-hidden border-b border-neutral-100">
                <img src={project.imageUrl} alt={project.title.en} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-neutral-900 backdrop-blur shadow-sm">
                  {project.category}
                </div>
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-2 text-xl font-bold text-neutral-900">{project.title.en}</h3>
                <p className="mb-4 flex-grow text-sm text-neutral-500 line-clamp-3">{project.description.en}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech.id} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                      {tech.name}
                    </span>
                  ))}
                </div>

                <Link to={`/projects/${project.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/projects">
            <Button variant="ghost">View all projects</Button>
          </Link>
        </div>
      </section>

      {/* Education Section - Cards */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 bg-neutral-50 py-12 rounded-2xl">
        <div className="mb-10 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-100 p-2 text-primary-600">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">Education</h2>
              <p className="mt-1 text-neutral-500">Academic background and degrees.</p>
            </div>
          </div>
          <Link to="/education" className="hidden text-primary-600 hover:text-primary-700 md:flex md:items-center font-medium">
            View full timeline <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {EDUCATION.slice(0, 3).map((edu) => (
            <Card key={edu.id} hoverEffect className="flex flex-col border-primary-100">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 border border-primary-100">
                  {edu.start_year} - {edu.end_year}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-neutral-900 line-clamp-1" title={edu.institution.en}>{edu.institution.en}</h3>
              <p className="mb-4 text-sm font-medium text-primary-600 line-clamp-2" title={edu.degree.en}>{edu.degree.en}</p>
              <p className="mb-4 flex-grow text-sm text-neutral-500 line-clamp-3">{edu.description.en}</p>
              
              <Link to="/education" className="mt-auto">
                <Button variant="ghost" size="sm" className="w-full justify-start pl-0 hover:bg-transparent hover:text-primary-600">
                  Read more <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/education">
            <Button variant="ghost">View full education</Button>
          </Link>
        </div>
      </section>
      
      {/* Experience Section - Cards */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div className="flex items-center gap-3">
             <div className="rounded-lg bg-accent-dev/10 p-2 text-accent-dev">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">Experience</h2>
              <p className="mt-1 text-neutral-500">Recent professional roles.</p>
            </div>
          </div>
          <Link to="/experience" className="hidden text-primary-600 hover:text-primary-700 md:flex md:items-center font-medium">
            View all experience <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {EXPERIENCES.slice(0, 3).map((exp) => (
            <Card key={exp.id} hoverEffect className="flex flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 font-bold text-xs">
                  {exp.company.substring(0, 2).toUpperCase()}
                </div>
                <span className="rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-500 border border-neutral-200">
                  {formatDate(exp.start_date)}
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-neutral-900 line-clamp-1">{exp.title.en}</h3>
              <p className="mb-4 text-sm font-medium text-primary-600">{exp.company}</p>
              
              <div className="mb-4 flex-grow">
                <p className="text-sm text-neutral-500 line-clamp-3">
                    {exp.description.en}
                </p>
              </div>
              
              <Link to="/experience" className="mt-auto">
                <Button variant="ghost" size="sm" className="w-full justify-start pl-0 hover:bg-transparent hover:text-primary-600">
                  View details <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
           <Link to="/experience">
            <Button variant="ghost">View all experience</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};