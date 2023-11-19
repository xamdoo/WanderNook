import Filter from '@/components/Filter'
import Hero from '@/components/Hero'
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar'
import ShowMore from '@/components/showMore';
import { bedroomsOptions, ratingOptions } from '@/constant';
import { HomeProps } from '@/types';
import { fetchProperties } from '@/utils'

export default async function Home({ searchParams }: HomeProps) {
  const allProperties = await fetchProperties({
    location: searchParams.location,
    checkin: searchParams.checkin,
    checkout: searchParams.checkout,
    adults: searchParams.adults,
    limit: searchParams.limit || 10,
  });

  const isDataEmpty = !Array.isArray(allProperties) || !allProperties || allProperties.length < 1;
  

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Accommodation Showcase</h1>
          <p>Discover unique spaces you'll love to stay in</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <Filter title='bedrooms' options={bedroomsOptions} />
            <Filter title='rating' options={ratingOptions} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__property-wrapper'>
              {allProperties.map((property, index) => (
                  <PropertyCard key={index} property={property} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allProperties.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  )
}
