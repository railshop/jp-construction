/**
 * src/data/careers.ts
 *
 * Open positions across JP Construction (general contracting) and
 * JP Operations (excavation, site work, and civil concrete).
 * Copy style: no em-dashes.
 */

export interface JobPosting {
  slug: string;
  title: string;
  company: 'JP Construction' | 'JP Operations';
  type: string;
  location: string;
  summary: string;
  about: string;
  responsibilities: string[];
  qualifications: string[];
  offers: string[];
}

export const jobs: JobPosting[] = [
  {
    slug: 'project-manager',
    title: 'Project Manager',
    company: 'JP Construction',
    type: 'Full-time',
    location: 'North Huntingdon, PA',
    summary: 'Run residential and commercial construction projects from contract to closeout: schedules, budgets, subs, and clients.',
    about: 'JP Construction builds custom homes, additions, pole buildings, and commercial projects across Westmoreland County. As Project Manager, you own the job after the handshake. You build the schedule, coordinate subcontractors and inspections, manage the budget, and keep the client informed from first site visit to final walkthrough. You are the person our clients trust with the biggest investment they will ever make, and the person our crews count on to keep the job moving.',
    responsibilities: [
      'Plan and manage multiple active projects from contract through closeout',
      'Build and maintain project schedules, and hold subcontractors to them',
      'Track budgets, review invoices, and manage change orders with clear client communication',
      'Coordinate permits, municipal inspections, and utility work with local jurisdictions',
      'Walk jobs regularly to hold quality and safety standards on site',
      'Serve as the client\'s single point of contact from kickoff to walkthrough',
    ],
    qualifications: [
      '3+ years managing residential or commercial construction projects',
      'Working knowledge of building codes, permitting, and inspection processes',
      'Strong scheduling and budgeting skills; comfortable with construction software and spreadsheets',
      'Clear, proactive communicator with clients, crews, and inspectors',
      'Valid driver\'s license and reliable transportation',
    ],
    offers: [
      'Competitive salary based on experience',
      'Company vehicle or vehicle allowance',
      'Paid time off and holidays',
      'Steady local work across Westmoreland County, home every night',
      'A growing company where your judgment actually shapes the job',
    ],
  },
  {
    slug: 'carpenter',
    title: 'Carpenter',
    company: 'JP Construction',
    type: 'Full-time',
    location: 'North Huntingdon, PA',
    summary: 'Rough and finish carpentry on custom homes, barndominiums, additions, and commercial projects.',
    about: 'JP Construction self-performs its carpentry, and it shows in the finished product. As a Carpenter you will frame walls, floors, and roofs, set windows and doors, and run finish trim on projects ranging from custom homes and barndominiums to additions and commercial build-outs. You will work alongside a crew that takes real pride in straight walls and tight joints, with a clear path to lead carpenter for people who earn it.',
    responsibilities: [
      'Frame walls, floors, and roof systems per plan on residential and commercial projects',
      'Set windows, exterior doors, and siding with proper flashing and weatherproofing',
      'Run finish work: interior doors, trim, stairs, and cabinetry installation',
      'Perform field measurements and layout from construction drawings',
      'Keep tools, materials, and the job site organized and safe',
      'Work with the project manager and subcontractors to keep the schedule moving',
    ],
    qualifications: [
      '3+ years of residential or commercial carpentry experience',
      'Able to read construction drawings and perform accurate layout',
      'Own basic hand tools; we supply the rest',
      'Finish carpentry experience is a strong plus',
      'Valid driver\'s license and reliable transportation',
    ],
    offers: [
      'Competitive hourly rate matched to your skill level',
      'A clear path to lead carpenter',
      'Paid time off and holidays',
      'Year-round local work, home every night',
      'A crew that cares about the craft',
    ],
  },
  {
    slug: 'structural-engineer',
    title: 'Structural Engineer',
    company: 'JP Construction',
    type: 'Full-time',
    location: 'North Huntingdon, PA',
    summary: 'In-house structural design and field review across custom homes, additions, pole buildings, and commercial work.',
    about: 'JP Construction is building out its Design & Engineering division, and this role sits at the center of it. You will size structural systems for new builds, review existing conditions for addition tie-ins, and produce the calculations and details that back our permit submissions. Unlike a desk-only consulting seat, this role gets you into the field: walking rough framing, solving real conditions with the crew, and seeing your designs built weeks after you draw them.',
    responsibilities: [
      'Perform structural analysis and design for wood, steel, post-frame, and concrete systems',
      'Review existing structures and design tie-ins for additions and renovations',
      'Produce and review structural drawings, details, and calculations with our architects',
      'Support permit submissions with stamped documents and respond to plan review comments',
      'Conduct site visits during foundations and rough framing to verify conforming work',
      'Advise project managers and field crews on structural questions as they arise',
    ],
    qualifications: [
      'Bachelor\'s degree in civil or structural engineering',
      'PE license preferred; strong EIT candidates working toward licensure considered',
      'Experience with wood-frame residential and light commercial structures',
      'Proficiency with structural design software and CAD',
      'Comfortable communicating with field crews, inspectors, and clients',
    ],
    offers: [
      'Competitive salary based on experience and licensure',
      'A mix of office and field work, not a desk-only seat',
      'Paid time off and holidays',
      'The chance to shape the standards of a growing engineering division',
      'Local projects you can drive to and watch get built',
    ],
  },
  {
    slug: 'operator',
    title: 'Equipment Operator',
    company: 'JP Operations',
    type: 'Full-time',
    location: 'North Huntingdon, PA',
    summary: 'Run excavators, dozers, and skid steers on residential and commercial site work across Westmoreland County.',
    about: 'JP Operations runs a modern fleet of excavators, dozers, loaders, and skid steers on projects ranging from residential foundations to full commercial site packages. As an Operator, you will dig, grade, and finish to plan with the kind of precision that makes the rest of the job easier for everyone behind you. Operators who can hit finish grade without a stake chase are worth their weight here, and we pay like it.',
    responsibilities: [
      'Operate excavators, dozers, skid steers, and loaders safely and productively',
      'Cut, fill, and finish grade to plan using laser and GPS grade control',
      'Dig footers, basements, and utility trenches to spec',
      'Perform daily equipment inspections and report maintenance needs',
      'Work with the foreman and ground crew to keep production flowing',
    ],
    qualifications: [
      '2+ years of seat time on excavators or dozers preferred',
      'Ability to read grade stakes and work from civil plans',
      'GPS machine control experience is a plus',
      'Valid driver\'s license; CDL a plus for equipment moves',
      'Commitment to safe operation around crews and utilities',
    ],
    offers: [
      'Top hourly rate for proven finish-grade operators',
      'Modern, well-maintained equipment',
      'Paid time off and holidays',
      'Overtime available in season',
      'Local work, home every night',
    ],
  },
  {
    slug: 'laborer',
    title: 'Laborer',
    company: 'JP Operations',
    type: 'Full-time',
    location: 'North Huntingdon, PA',
    summary: 'Ground-level role on excavation and site work crews. No experience required, just show up ready to work.',
    about: 'Every good crew is built on dependable laborers. At JP Operations you will work alongside experienced operators and foremen on excavation, utility, and concrete projects across Westmoreland County. You will learn pipe work, grade checking, and site skills that turn into an operator or foreman career path. We hire for attitude and train for skill.',
    responsibilities: [
      'Assist with excavation, pipe laying, backfill, and site cleanup',
      'Check grades, move materials, and support operators on the ground',
      'Set up and maintain trench protection and site safety measures',
      'Handle hand work: shoveling, compacting, forming, and finishing assistance',
      'Keep tools, equipment, and job sites clean and organized',
    ],
    qualifications: [
      'Dependable, on time, and ready to work outdoors year-round',
      'Able to lift 75 pounds and handle physical work all day',
      'Valid driver\'s license and reliable transportation',
      'Construction or landscaping experience is a plus, not a requirement',
    ],
    offers: [
      'Competitive hourly wage with regular raises as your skills grow',
      'A real career path toward operator and foreman roles',
      'Paid time off and holidays',
      'Overtime available in season',
      'Local work, home every night',
    ],
  },
];
