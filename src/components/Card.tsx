export const StatCard = ({ icon: Icon, title, value, color = 'blue' }: any) => {
	const gradients = {
		blue: 'from-blue-500 to-cyan-500',
		red: 'from-red-500 to-orange-500',
		purple: 'from-purple-500 to-pink-500',
	};

	return (
		<div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl p-6 transition-all duration-300 group">
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<p className="text-sm font-medium text-slate-600">{title}</p>
					<p className="text-3xl font-bold text-slate-800">{value}</p>
				</div>
				<div
					className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
						gradients[color as keyof typeof gradients]
					} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
					<Icon className="w-6 h-6 text-white" />
				</div>
			</div>
		</div>
	);
};

export const InfluenceCard = ({ speaker, score, tactics }: any) => (
	<div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
		<div className="flex justify-between items-center mb-4">
			<h4 className="font-bold text-slate-800 text-lg">{speaker}</h4>
			<div className="text-right">
				<span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
					{score}%
				</span>
			</div>
		</div>
		<div className="w-full bg-slate-200/50 rounded-full h-3 mb-4 overflow-hidden">
			<div
				className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
				style={{ width: `${score}%` }}></div>
		</div>
		<div className="flex flex-wrap gap-2">
			{tactics?.map((tactic: any, idx: any) => (
				<span
					key={idx}
					className="px-3 py-1 bg-white/60 backdrop-blur-sm text-purple-700 text-xs font-medium rounded-full border border-purple-200/50 shadow-sm">
					{tactic}
				</span>
			))}
		</div>
	</div>
);

export const FallacyCard = ({ type, count, examples }: any) => (
	<div className="bg-gradient-to-br from-red-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
		<div className="flex justify-between items-center mb-4">
			<h4 className="font-bold text-slate-800 text-lg">{type}</h4>
			<div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
				{count}
			</div>
		</div>
		<div className="space-y-3">
			{examples?.slice(0, 2).map((example: any, idx: any) => (
				<div
					key={idx}
					className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-red-200/30">
					<p className="text-sm text-slate-700 italic leading-relaxed">{example}</p>
				</div>
			))}
		</div>
	</div>
);

export const EmotionCard = ({ emotion, score }: any) => (
	<div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/30 shadow-sm hover:shadow-md transition-all duration-200">
		<span className="text-sm font-medium text-slate-700">
			{emotion}: <span className="font-bold text-blue-600">{Math.round(score * 100)}%</span>
		</span>
	</div>
);
