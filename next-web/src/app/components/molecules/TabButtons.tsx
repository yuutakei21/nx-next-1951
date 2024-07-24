import { Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";

const SAMPLE_TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];
function TabButtons({ TABS = SAMPLE_TABS, onChange }: any) {
  const [value, setValue] = useState("unmonitored");

  function handleChange(newVal: any) {
    console.log(newVal)
    setValue(newVal);
    if (onChange) onChange(newVal);
  }
  
  return (
    <Tabs value={value} className="w-full md:w-max">
      <TabsHeader>
        {TABS.map(({ label, value }: any) => (
          <Tab key={value} value={value} onClick={(e) => handleChange(value)}>
            &nbsp;&nbsp;{label}&nbsp;&nbsp;
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}

export default TabButtons;
