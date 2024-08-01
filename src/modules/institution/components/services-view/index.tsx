import {Button} from '@/modules/common/components/button';
import {Service} from '../../types';
import {FiPlus} from 'react-icons/fi';

type Props = {
  servicesData: Service[];
  services: any;
  onOpen: any;
};

export default function ServicesView({servicesData, services, onOpen}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        name="services"
        className={`flex flex-col w-full ${services.length > 0 && 'justify-center items-center'} h-60 max-h-80 font-normal p-2  text-black border-2 bg-white shadow-sm`}
        onPress={onOpen}
      >
        {services.length === 0 ? (
          <div className="flex flex-row gap-2 font-bold">
            <FiPlus className="h-6 w-6" />
            <h1> Agregar</h1>
          </div>
        ) : (
          <section className="flex flex-col justify-start gap-2 items-start w-full max-h-80 overflow-x-hidden overflow-y-auto ">
            {servicesData.map(
              service =>
                services.includes(service.id) && (
                  <span className="pb-1 text-start w-full border-b-1 border-black border-dashed">
                    {service.name}
                  </span>
                )
            )}
          </section>
        )}
      </Button>
    </div>
  );
}
