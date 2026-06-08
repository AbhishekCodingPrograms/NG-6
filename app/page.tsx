import { getLatestPosts, getSpotlightPost, getTrendingPosts, formatTimeAgo, getPostsByCategorySlug } from '@/lib/api';
import MenuHeroSection from '@/components/MenuHeroSection';
import MenuGridSection from '@/components/MenuGridSection';
import MenuListSection from '@/components/MenuListSection';

// By default, Next.js Server Components can be async!
export default async function Home() {
  // Fetch all headless data in parallel for maximum speed
  const [
    latestPosts, 
    spotlightPost, 
    trendingPosts,
    freeCoursesPosts,
    internshipsPosts,
    blogPosts,
    recruitmentPosts,
    govtJobsPosts,
    hackathonPosts,
    jobsPosts
  ] = await Promise.all([
    getLatestPosts(5),
    getSpotlightPost(),
    getTrendingPosts(),
    getPostsByCategorySlug('free-courses', 5),
    getPostsByCategorySlug('internships', 4),
    getPostsByCategorySlug('blog', 5),
    getPostsByCategorySlug('recruitment', 6),
    getPostsByCategorySlug('govt-jobs', 6),
    getPostsByCategorySlug('hackathon', 4),
    getPostsByCategorySlug('jobs', 5)
  ]);

  return (
    <div className="pb-24">
      {/* Top Grid Container */}
      <div className="container mx-auto px-4 mt-4 md:mt-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-8 md:mb-12">
          
          {/* Left Column: Latest Updates */}
          <div className="lg:w-1/4 lg:border-r border-border lg:pr-8 order-2 lg:order-1">
            <div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-6">
              <h2 className="font-bold uppercase tracking-wider text-lg">Latest Updates</h2>
            </div>
            <ul className="space-y-0">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <li key={post.id} className="news-list-item group cursor-pointer">
                    <span className="text-primary font-bold text-xs uppercase block mb-1">
                      {formatTimeAgo(post.date)}
                    </span>
                    <a href={`/article/${post.slug}`} className="block font-bold leading-tight group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 italic">No latest updates available.</li>
              )}
            </ul>
          </div>

          {/* Center Column: Spotlight */}
          <div className="lg:w-2/4 lg:border-r border-border lg:pr-8 order-1 lg:order-2">
            {spotlightPost ? (
              <article className="border-b border-border pb-8 mb-8 group cursor-pointer">
                {spotlightPost.featured_image_url ? (
                  <div className="relative aspect-video mb-4 overflow-hidden bg-gray-100 rounded-lg">
                    <img 
                      src={spotlightPost.featured_image_url} 
                      alt="Spotlight Image" 
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
                    />
                  </div>
                ) : null}
                
                <a href={`/article/${spotlightPost.slug}`} className="block">
                  <h1 
                    className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-4 group-hover:text-primary transition-colors"
                    dangerouslySetInnerHTML={{ __html: spotlightPost.title.rendered }}
                  />
                </a>
                
                <div 
                  className="font-serif text-gray-700 text-lg leading-relaxed line-clamp-3 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: spotlightPost.excerpt.rendered }}
                />
              </article>
            ) : (
              <div className="text-center text-gray-500 py-12">No spotlight story available. Make sure WordPress is running!</div>
            )}
          </div>

          {/* Right Column: Trending */}
          <div className="lg:w-1/4 order-3 lg:order-3">
            <div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-6">
              <h2 className="font-bold uppercase tracking-wider text-lg">Trending Now</h2>
              <span className="bg-primary text-white text-[0.65rem] font-bold px-1.5 py-0.5 ml-2">HOT</span>
            </div>
            
            <ul className="space-y-6 list-none counter-reset-trending">
              {trendingPosts.length > 0 ? (
                trendingPosts.map((post, i) => (
                  <li key={post.id} className="flex gap-4 group cursor-pointer border-b border-dashed border-border pb-6 last:border-0">
                    <span className="text-4xl font-serif font-black text-gray-200 leading-none mt-1 group-hover:text-primary transition-colors dark:text-gray-800">
                      {i + 1}
                    </span>
                    <a href={post.link} className="block font-bold leading-tight group-hover:text-primary transition-colors mt-1">
                      {post.title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 italic">No trending posts available.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 1. Hero Layout (Featured) */}
      <MenuHeroSection 
        title="Free Courses" 
        href="/category/free-courses" 
        widgetColor="bg-blue-600"
        posts={freeCoursesPosts}
      />
      
      {/* 2. Grid Layout */}
      <div className="bg-slate-50 dark:bg-black/20 border-y border-gray-200 dark:border-gray-800 -my-8 pb-8 pt-8">
        <MenuGridSection 
          title="Internships" 
          href="/category/internships" 
          widgetColor="bg-emerald-600"
          posts={internshipsPosts}
        />
      </div>
      
      {/* 3. Hero Layout */}
      <MenuHeroSection 
        title="Blog" 
        href="/category/blog" 
        widgetColor="bg-fuchsia-600"
        posts={blogPosts}
      />
      
      {/* 4. Dense List Layout */}
      <div className="bg-slate-50 dark:bg-black/20 border-y border-gray-200 dark:border-gray-800 -my-8 pb-8 pt-8">
        <MenuListSection 
          title="Recruitment" 
          href="/category/recruitment" 
          widgetColor="bg-amber-600"
          posts={recruitmentPosts}
        />
      </div>
      
      {/* 5. Dense List Layout */}
      <MenuListSection 
        title="Govt Job" 
        href="/category/govt-jobs" 
        widgetColor="bg-rose-600"
        posts={govtJobsPosts}
      />
      
      {/* 6. Grid Layout */}
      <div className="bg-slate-50 dark:bg-black/20 border-y border-gray-200 dark:border-gray-800 -my-8 pb-8 pt-8">
        <MenuGridSection 
          title="Hackathon" 
          href="/category/hackathon" 
          widgetColor="bg-indigo-600"
          posts={hackathonPosts}
        />
      </div>
      
      {/* 7. Hero Layout */}
      <MenuHeroSection 
        title="Jobs" 
        href="/category/jobs" 
        widgetColor="bg-teal-600"
        posts={jobsPosts}
      />

    </div>
  );
}
