import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { SwiperSlide, Swiper } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SlideOptions } from "./SliderOptions";
import { SliderNavigation } from "./SliderNavigation";

export function Transactions() {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10">
      <header>
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 tracking-[-0.5] font-medium">Transações</span>
            <ChevronDownIcon className="text-gray-900" />
          </button>
          <button>
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6 relative">
          <Swiper
            slidesPerView={3}
            centeredSlides
          >
            <SliderNavigation />
            {MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <SlideOptions isActive={isActive} month={month} index={index} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>
      <div>
        Content
      </div>
    </div>
  )
}
