import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../assets/HeroSections.png'
import theory from '../assets/theory.webp'
import shortNote from '../assets/short note.webp'
import dailyReminders from '../assets/reminder.webp'
import challengingTestPaper from '../assets/challanging.webp'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div id="home" className="relative mt-18 lg:mt-0">
        <img src={HeroSection} alt="Hero Section" className="w-full h-auto" />
      </div>

      {/* About Section */}
      <div
        id="about"
        className="bg-navy py-16 md:py-24 px-6 sm:px-12 md:px-24"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-iskoola text-white mb-6">
          ගුරුවරයා පිළිබඳව...
        </h1>
        <p className="text-white font-iskoola text-base sm:text-lg md:text-xl leading-relaxed md:px-36 mt-4">
          කැලණිය විශ්වවිද්‍යාලයෙන් රසායන විද්‍යාව පිළිබඳ උපාධිය ලබාගත්, විද්‍යාවට සහ ඉගැන්වීමට දැඩි කැපවීමක් දක්වන ගුරුවරයෙකු ලෙස මම සිසුන්ගේ අධ්‍යාපනික ගමන සාර්ථක කරගැනීමට නිරන්තරයෙන් කැපවී සිටිමි. කැලණිය විශ්වවිද්‍යාලයේ අධ්‍යයන කාලය තුළ ලබාගත් දැනුම සහ පර්යේෂණාත්මක අත්දැකීම්, පාසල් සහ උසස් පෙළ සිසුන්ට සරල හා ප්‍රායෝගික ආකාරයෙන් රසායන විද්‍යාව අවබෝධ කර දීමට මට ශක්තියක් වී ඇත. රසායන විද්‍යාව යනු සූත්‍ර සහ සමීකරණ පමණක් නොව, අප අවට ලෝකය ක්‍රියාත්මක වන ආකාරය තේරුම් ගැනීමට උපකාරී වන විෂයයක් බව මම විශ්වාස කරමි. ඒ නිසාම සෑම පාඩමක්ම සැබෑ ජීවිත උදාහරණ සහ ක්‍රියාකාරකම් සමඟ ඉදිරිපත් කරමින්, සිසුන් තුළ විෂය පිළිබඳ උනන්දුව සහ විශ්වාසය ගොඩනැගීමට උත්සාහ කරමි.
        </p>
        <p className="text-white font-iskoola text-base sm:text-lg md:text-xl leading-relaxed md:px-36 mt-4">
          වසර ගණනාවක් පුරා සිසුන් විශිෂ්ට ප්‍රතිඵල කරා රැගෙන යාමට හැකි වූයේ විෂය දැනුමට අමතරව ඔවුන්ගේ හැකියාවන් හඳුනාගෙන නිවැරදි මඟපෙන්වීම ලබාදීම නිසාය. අනාගතයේ විද්‍යාඥයින්, වෛද්‍යවරුන් සහ ඉංජිනේරුවන් බිහි කිරීමේ අරමුණින්, දැනුම බෙදාගනිමින් සිසුන්ගේ සිහින සැබෑ කරගැනීමට මම අදත් කැපවී සිටිමි.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 mt-8 md:mt-12">
          <h1 className="text-5xl sm:text-7xl md:text-[100px] font-mahee text-white">wms</h1>
          <span className="text-5xl sm:text-7xl md:text-[100px] font-sansala text-yelo">rcqka</span>
          <span className="text-5xl sm:text-7xl md:text-[100px] font-mahee text-white">;kkafkuq'</span>
        </div>
      </div>

      {/* Classes Section */}
      <div
        id="classes"
        className="bg-white py-16 md:py-24 px-6 sm:px-12 md:px-24 flex flex-col items-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-iskoola text-navy mb-6 text-center">
          අපගේ පාඨමාලාවන්
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-12 w-full">
          <div className="bg-navy rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-10">Revision Classes</h2>
            <p className="text-white font-iskoola text-base md:text-lg text-center">
              මීට පෙර ඉගෙන ගත් සියලුම විෂය කරුණු නැවත සමාලෝචනය කරමින්, ඔබට අමතක වී ඇති හෝ නොතේරුණු කරුණු නැවත පැහැදිලි කිරීම. හොඳම අවස්ථාවයි. මෙම පන්තිවල දී වැදගත්ම කරුණු ඉස්මතු කරමින්, විභාගයට වඩාත් ප්‍රයෝජනවත් වන ආකාරයෙන් නැවත පැහැදිලි කරනු ලැබේ. ඔබේ දැනුම තහවුරු කර ගැනීමට සහ විභාග සූදානමේ දී ආත්මවිශ්වාසය ගොඩ නගා ගැනීමට <span>Revision Classes</span> වලට සහභාගී වීම ඉතාමත් වැදගත් වේ.
            </p>
          </div>
          <div className="bg-navy rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-10">Theory Classes</h2>
            <p className="text-white font-iskoola text-base md:text-lg text-center">
              රසායන විද්‍යාවේ මූලික සංකල්ප, නීති, සූත්‍ර සහ න්‍යායන් ගැඹුරින් අවබෝධ කර ගැනීමට පවත්වනු ලබන ප්‍රධාන පන්ති වේ. රසායන විද්‍යාවේ සෑම පාඩමක්ම පියවරෙන් පියවර විස්තරාත්මකව ඉදිරිපත් කරනු ලැබේ. සංකීර්ණ සංකල්ප පහසුවෙන් තේරුම් ගත හැකි වන ආකාරයෙන්, උදාහරණ සහිතව පැහැදිලි කිරීම අපගේ පන්තිවල විශේෂත්වයයි.
            </p>
          </div>
          <div className="bg-navy rounded-lg p-6 flex flex-col items-center sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-10">Paper Classes</h2>
            <p className="text-white font-iskoola text-base md:text-lg text-center">
              විභාගයට සෘජුවම සූදානම් වීම සඳහා වැදගත්ම පන්ති වර්ගය වේ. අපගේ පන්තිවල දී ගතවූ වර්ෂවල විභාග ප්‍රශ්න පත්‍ර විශ්ලේෂණය කරමින්, ප්‍රශ්නවලට නිවැරදිව සහ වේගයෙන් පිළිතුරු සැපයීමේ ක්‍රමවේද ඉගෙන ගනු ලැබේ. කාල කළමනාකරණය, ලකුණු ලබා ගැනීමේ උපක්‍රම සහ පොදු වැරදි මඟහරවා ගන්නා ආකාරය පිළිබඳව විශේෂ මඟ පෙන්වීමක් ලබා දෙනු ඇත.
            </p>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div
        id="process"
        className="py-16 md:py-24 px-6 sm:px-12 md:px-24 flex flex-col items-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-iskoola text-navy mb-6 text-center">
          අපගේ වැඩපිළිවෙල
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-12 w-full">

          {/* A to Z Theory */}
          <div className="bg-white border border-gra rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 md:mb-10">A to Z Theory</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={theory}
                alt="Theory"
                className="w-full sm:w-1/2 h-48 object-cover rounded-lg"
              />
              <p className="text-navy font-iskoola text-base md:text-lg text-center sm:text-left">
                මුළු Syllabus එකම පාඩම් 14 ම ආවරණය වෙන විදියට tutes 24 ක් එක්ක අත්‍යවශ්‍ය කොටස් ඔයාලගේ අතින්ම ලියන ගමන් තමයි අපි Theory A to Z උගන්වන්නේ.
              </p>
            </div>
          </div>

          {/* Short Note */}
          <div className="bg-white border border-gra rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 md:mb-10">Short Note</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={shortNote}
                alt="Short Note"
                className="w-full sm:w-1/2 h-48 object-cover rounded-lg"
              />
              <p className="text-navy font-iskoola text-base md:text-lg text-center sm:text-left">
                අවශ්‍ය points ටික ඔයාලට දීලා ඒ points එක්ක short note එක එන්න ඕන විදිය ඔයාලත් එක්කම සම්පූර්ණයෙන්ම විස්තර කරන ගමන් තමයි අපි short note එක හදන්නේ.
              </p>
            </div>
          </div>

          {/* Daily Reminders */}
          <div className="bg-white border border-gra rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 md:mb-10">Daily Reminders</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={dailyReminders}
                alt="Daily Reminders"
                className="w-full sm:w-1/2 h-48 object-cover rounded-lg"
              />
              <p className="text-navy font-iskoola text-base md:text-lg text-center sm:text-left">
                මේක තමයි සුපිරිම වැඩේ. පන්ති පටන් ගත්ත සතියට පස්සේ සතියේ ඉදන් අපි මේ වැඩේ පටන් ගන්නවා. පන්තිය ඇතුලෙම time තියලා paper එක ලියලා, එදාම ඒ වෙලේම paper එක බලලා, ලකුණු අනුව ශ්‍රේණිගත කරලා මුල් ස්ථානවලට තෑගි දෙන ගමන් ඊළඟ paper එකට වෙනම target එකක් දෙනවා.
              </p>
            </div>
          </div>

          {/* Challenging Test Paper */}
          <div className="bg-white border border-gra rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 md:mb-10">Challenging Test Paper</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={challengingTestPaper}
                alt="Challenging Test Paper"
                className="w-full sm:w-1/2 h-48 object-cover rounded-lg"
              />
              <p className="text-navy font-iskoola text-base md:text-lg text-center sm:text-left">
                මේක ඉතින් next level වැඩක්, මේක පටන්ගන්නේ මුල් පාඩම් දෙක ඉවර වෙනවත් එක්කම වෙනම paper class එකක් විදියට. mcq 20යි. ව්‍යුහගත රචනා 2 කින්. අවසන් වෙන්නේ ඉතින් A/L විභාග ප්‍රශ්න පත්‍රයෙන් තමයි.
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}