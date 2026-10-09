(() => {
  const data = window.PLACEMENT_DATA;
  const questions = data.stages.flatMap((stage) => stage.questions.map((q) => ({ ...q, stageId: stage.id })));

  const evaluate = (responses) => {
    const complete = questions.every((q) => {
      const answer = responses[q.id];
      const max = q.type === "practice" ? q.options.length - 1 : q.options.length;
      return Number.isInteger(answer) && answer >= 0 && answer <= max;
    });
    if (!complete) return null;

    const stages = data.stages.map((stage, index) => {
      const practical = stage.questions.filter((q) => q.type === "practice");
      const knowledge = stage.questions.filter((q) => q.type === "knowledge");
      const practiceReady = practical.filter((q) => responses[q.id] >= 2).length;
      const correct = knowledge.filter((q) => responses[q.id] === q.answer).length;
      const consistent = practical.filter((q) => responses[q.id] === 3).length;
      return { id: stage.id, practiceReady, consistent, correct, passed: index === 3 ? consistent === 3 : practiceReady === 3 };
    });
    const firstGap = stages.findIndex((stage) => !stage.passed);
    const levelIndex = firstGap === -1 ? 4 : firstGap;
    const stageIndex = Math.min(levelIndex, 3);
    const target = questions.filter((q) => q.stageId === data.stages[stageIndex].id && q.type === "practice");
    const practicalGaps = target.filter((q) => responses[q.id] < (stageIndex === 3 ? 3 : 2))
      .sort((a, b) => responses[a.id] - responses[b.id]);
    const knowledgeGaps = questions.filter((q) => q.type === "knowledge" && responses[q.id] !== q.answer);
    const plan = practicalGaps.slice(0, 2);
    if (knowledgeGaps.length) plan.push(knowledgeGaps[0]);
    for (const q of [...practicalGaps, ...target]) {
      if (plan.length === 3) break;
      if (!plan.some((item) => item.id === q.id)) plan.push(q);
    }
    const strengths = questions.filter((q) => q.type === "practice" && responses[q.id] >= 2)
      .sort((a, b) => responses[b.id] - responses[a.id]).slice(0, 3);
    return {
      stages, levelIndex, stageIndex, practicalGaps, knowledgeGaps, plan, strengths, target,
      theoryCorrect: 12 - knowledgeGaps.length,
      uneven: levelIndex < 3 && stages.slice(stageIndex + 1).some((stage) => stage.practiceReady > 0),
    };
  };

  window.PLACEMENT = { questions, evaluate };
})();
