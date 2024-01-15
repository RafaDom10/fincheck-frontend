import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNavigation } from './AccountsSliderNavigation';

export function Accounts() {

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="text-white tracking-[-0.5px] block">
          Saldo Total
        </span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl text-white tracking-[-1px]">
            R$ 1000,00
          </strong>
          <button className="h-8 w-8 flex items-center justify-center">
            <EyeIcon open={true} />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
          >
            <div className="flex items-center justify-between mb-4" slot='container-start'>
              <strong className="text-white tracking-[-1px] text-lg font-bold" >
                Minhas contas
              </strong>

              <AccountSliderNavigation />
            </div>

              <SwiperSlide>
                <AccountCard
                  color="#7950F2"
                  name="Nubank"
                  balance={1000.90}
                  type="CASH"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  color="#7950F2"
                  name="Nubank"
                  balance={1000.90}
                  type="CASH"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  color="#7950F2"
                  name="Nubank"
                  balance={1000.90}
                  type="CASH"
                />
              </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
