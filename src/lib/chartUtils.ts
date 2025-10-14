// Tremor Raw chartColors [v0.0.0]

export type ColorUtility = "bg" | "stroke" | "fill" | "text"

export const chartColors = {
	blue: {
		bg: "bg-blue-7",
		stroke: "stroke-blue-7",
		fill: "fill-blue-7",
		text: "text-blue-7",
	},
	emerald: {
		bg: "bg-green-7",
		stroke: "stroke-green-7",
		fill: "fill-green-7",
		text: "text-green-7",
	},
	violet: {
		bg: "bg-purple-7",
		stroke: "stroke-purple-7",
		fill: "fill-purple-7",
		text: "text-purple-7",
	},
	amber: {
		bg: "bg-amber-7",
		stroke: "stroke-amber-7",
		fill: "fill-amber-7",
		text: "text-amber-7",
	},
	gray: {
		bg: "bg-gray-5",
		stroke: "stroke-gray-5",
		fill: "fill-gray-5",
		text: "text-gray-5",
	},
	cyan: {
		bg: "bg-teal-7",
		stroke: "stroke-teal-7",
		fill: "fill-teal-7",
		text: "text-teal-7",
	},
	indigo: {
		bg: "bg-brand",
		stroke: "stroke-brand",
		fill: "fill-brand",
		text: "text-brand",
	},
	pink: {
		bg: "bg-pink-7",
		stroke: "stroke-pink-7",
		fill: "fill-pink-7",
		text: "text-pink-7",
	},
} as const satisfies {
	[color: string]: {
		[key in ColorUtility]: string;
	};
};

export type AvailableChartColorsKeys = keyof typeof chartColors

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors,
) as Array<AvailableChartColorsKeys>

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility,
): string => {
  const fallbackColor = {
    bg: "bg-gray-500",
    stroke: "stroke-gray-500",
    fill: "fill-gray-500",
    text: "text-gray-500",
  }
  return chartColors[color]?.[type] ?? fallbackColor[type]
}

// Tremor Raw getYAxisDomain [v0.0.0]

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "auto" : (minValue ?? 0)
  const maxDomain = maxValue ?? "auto"
  return [minDomain, maxDomain]
}

// Tremor Raw hasOnlyOneValueForKey [v0.1.0]

export function hasOnlyOneValueForKey(
  array: any[],
  keyToCheck: string,
): boolean {
  const val: any[] = []

  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
      val.push(obj[keyToCheck])
      if (val.length > 1) {
        return false
      }
    }
  }

  return true
}
