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
    slug: 'foreman',
    title: 'Foreman',
    company: 'JP Operations',
    type: 'Full-time',
    location: 'North Huntingdon, PA',
    summary: 'Lead excavation and site work crews in the field: layout, grade, production, and safety.',
    about: 'JP Operations is the excavation, site work, and civil concrete arm of the JP family of companies. As Foreman, you run the crew on the ground. You read the prints, set the plan for the day, keep production moving, and make sure every cut, pipe run, and pour goes in right the first time. You set the tone for safety and workmanship on every site you touch.',
    responsibilities: [
      'Lead a field crew through excavation, grading, utility, and concrete scopes',
      'Read plans and perform layout and grade checks with laser and GPS equipment',
      'Plan daily production, materials, and equipment needs ahead of the crew',
      'Enforce safety practices including trench protection and utility locates',
      'Coordinate with the Project Manager on schedule, progress, and site conditions',
      'Train and develop laborers and operators on the crew',
    ],
    qualifications: [
      '5+ years in excavation or site work, with at least 2 leading a crew',
      'Ability to read civil drawings and hit grade consistently',
      'Experience with pipe work, stormwater, and site concrete preferred',
      'OSHA 10 or 30 certification preferred; we will train the right candidate',
      'Valid driver\'s license; CDL a plus',
    ],
    offers: [
      'Top-of-market hourly rate based on experience',
      'Consistent overtime available in season',
      'Paid time off and holidays',
      'Well-maintained modern equipment',
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
    slug: 'driver',
    title: 'Driver',
    company: 'JP Operations',
    type: 'Full-time',
    location: 'North Huntingdon, PA',
    summary: 'CDL driver for tri-axle and equipment hauling. Local routes, home every night.',
    about: 'Keep our crews supplied and our equipment moving. As a Driver for JP Operations you will haul aggregate, spoils, and materials in a tri-axle dump and move equipment between sites with a lowboy. All routes are local to Westmoreland County and the surrounding area, which means no overnights, ever. You are home for dinner every night.',
    responsibilities: [
      'Haul stone, soil, and demolition spoils to and from active job sites',
      'Move excavators and dozers between sites with a lowboy trailer',
      'Perform pre-trip and post-trip inspections and keep DOT logs current',
      'Load and unload safely, and secure every load properly',
      'Support the crew on the ground when hauling is caught up',
    ],
    qualifications: [
      'Valid Class A or B CDL with a clean driving record',
      'Tri-axle dump experience preferred; lowboy experience a strong plus',
      'Current DOT medical card',
      'Willingness to pitch in on site when not behind the wheel',
    ],
    offers: [
      'Competitive hourly rate based on experience and endorsements',
      'Local routes only, home every night',
      'Paid time off and holidays',
      'Well-maintained trucks',
      'Steady year-round work',
    ],
  },
];
