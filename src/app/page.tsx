"use client";
import {
  AiOutlineUser,
  AiOutlineUserSwitch,
  AiOutlinePlus,
  AiOutlineAreaChart,
  AiOutlineDollar,
} from "react-icons/ai";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { CardButton } from "@/components/CardButton";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="p-3 flex flex-col space-y-3">
        <Card>
          <h3 className="font-bold">Carona do dia:</h3>
          <div className="flex justify-between mt-3 space-x-3">
            <div className="text-sm text-gray-600">
              <p>Carro: Fiat Cronos</p>
              <p>Passageiros: 3</p>
              <p>Apenas ida ou volta: 0</p>
              <p>Preço/passageiro: R$ 10,00</p>
              <hr className="my-2" />
              <p>
                <strong>Total: R$ 30,00</strong>
              </p>
            </div>
            <img
              className="h-[5rem]"
              src="https://production.autoforce.com/uploads/version/profile_image/5529/comprar-drive-1-3-s-design_5eb8945a45.png"
              alt=""
            />
          </div>
        </Card>

        <div className="flex space-x-2">
          <CardButton href="/new-ride">
            <AiOutlinePlus className="h-8 w-8 text-emerald-600" /> Nova carona
          </CardButton>
          <CardButton href="/new-ride">
            <AiOutlineDollar className="h-8 w-8 text-emerald-600" />
            Pagamentos
          </CardButton>
          <CardButton href="/new-ride">
            <AiOutlineAreaChart className="h-8 w-8 text-emerald-600" />
            Relatórios
          </CardButton>
        </div>

        <div className="flex justify-between">
          <h3 className="font-bold">Últimas caronas:</h3>
          <a className="text-emerald-600 font-semibold" href="">
            Ver todas
          </a>
        </div>
        <ul className="space-y-2">
          <li>
            <Card>
              <div className="flex justify-between">
                <div>
                  <p>Fiat Cronos</p>
                  <div className="flex space-x-2">
                    <p className="text-xs text-gray-600">19/07/2023</p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <AiOutlineUser /> 3
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <AiOutlineUserSwitch /> 0
                    </p>
                  </div>
                </div>
                <p>
                  <strong>R$ 30,00</strong>
                </p>
              </div>
            </Card>
          </li>
          <li>
            <Card>
              <div className="flex justify-between">
                <div>
                  <p>Fiat Cronos</p>
                  <div className="flex space-x-2">
                    <p className="text-xs text-gray-600">19/07/2023</p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <AiOutlineUser /> 3
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <AiOutlineUserSwitch /> 0
                    </p>
                  </div>
                </div>
                <p>
                  <strong>R$ 30,00</strong>
                </p>
              </div>
            </Card>
          </li>
          <li>
            <Card>
              <div className="flex justify-between">
                <div>
                  <p>Fiat Cronos</p>
                  <div className="flex space-x-2">
                    <p className="text-xs text-gray-600">19/07/2023</p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <AiOutlineUser /> 3
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <AiOutlineUserSwitch /> 0
                    </p>
                  </div>
                </div>
                <p>
                  <strong>R$ 30,00</strong>
                </p>
              </div>
            </Card>
          </li>
        </ul>
      </div>
    </main>
  );
}
