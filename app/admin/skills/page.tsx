import Link from "next/link";
import { Plus, Pencil, Trash2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";

const skills = [
    { id: 1, name: "Python", level: 90, category: "Data Engineering" },
    { id: 2, name: "SQL", level: 85, category: "Data Engineering" },
    { id: 3, name: "React", level: 75, category: "Frontend" },
];

export default function SkillsList() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Compétences</h1>
                    <p className="text-slate-500">Gérez vos compétences techniques.</p>
                </div>
                <Link href="/admin/skills/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-xl px-5">
                        <Plus className="w-5 h-5 mr-2" />
                        Nouvelle Compétence
                    </Button>
                </Link>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative">
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/admin/skills/${skill.id}`}
                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors inline-block"
                                title="Modifier"
                            >
                                <Pencil className="w-4 h-4" />
                            </Link>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{skill.name}</h3>
                                <p className="text-xs text-slate-500">{skill.category}</p>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium text-slate-600">
                                <span>Maîtrise</span>
                                <span>{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
