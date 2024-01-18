import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cs';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesIsVisible,
    toggleValuesVisibility,
    isLoading,
    accounts
  } = useAccountsController()

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className='flex items-center justify-center w-full h-full'>
          <Spinner className='text-teal-950/50 fill-white w-10 h-10' />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="text-white tracking-[-0.5px] block">
              Saldo Total
            </span>
            <div className="flex items-center gap-2">
              <strong className={cn(
                "text-2xl text-white tracking-[-1px]",
                !areValuesIsVisible && "blur-[10px]"
              )}>
                {formatCurrency(1000.00)}
              </strong>
              <button className="h-8 w-8 flex items-center justify-center" onClick={toggleValuesVisibility}>
                <EyeIcon open={!areValuesIsVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg font-bold" >
                    Minhas contas
                  </strong>
                </div>

                <button className='flex flex-col items-center justify-center gap-4 mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600'>
                  <div className='flex items-center justify-center border-2 border-dashed w-11 h-11 rounded-full'>
                    <PlusIcon className='text-white w-6 h-6'/>
                  </div>
                  <span className='text-white font-medium tracking-[-0.5px] block w-32 text-center'>
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <>
                <div>
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
                    onSlideChange={swiper => {
                      setSliderState({
                        isBeginning: swiper.isBeginning,
                        isEnd: swiper.isEnd
                      })
                    }}
                  >
                    <div className="flex items-center justify-between mb-4" slot='container-start'>
                      <strong className="text-white tracking-[-1px] text-lg font-bold" >
                        Minhas contas
                      </strong>

                      <SliderNavigation
                        isBeginning={sliderState.isBeginning}
                        isEnd={sliderState.isEnd}
                      />
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
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
